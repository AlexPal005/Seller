import { AccountSubMenu } from "../AccountSubMenu/AccountSubMenu.tsx"
import { MyPostsFilters } from "./MyPostsFilters/MyPostsFilters.tsx"
import { ProductCard } from "../ProductCard/ProductCard.tsx"
import React, { createContext, useContext, useEffect, useState } from "react"
import {
  SortDirection,
  SortField,
  Status,
  useProduct,
} from "../../../Hooks/Product.tsx"
import { useLocation } from "react-router-dom"
import { UserContext } from "../../../App.tsx"

type MyPostsContextType = {
  productName: string
  setProductName: React.Dispatch<React.SetStateAction<string>>
  setCategory: React.Dispatch<React.SetStateAction<string>>
  setSortField: React.Dispatch<React.SetStateAction<SortField | null>>
  setSortDirection: React.Dispatch<React.SetStateAction<SortDirection | null>>
}
const myPostsContextDefault = {
  productName: "",
  setProductName: () => {},
  setCategory: () => {},
  setSortField: () => {},
  setSortDirection: () => {},
}
export const MyPostsContext = createContext<MyPostsContextType>(
  myPostsContextDefault,
)
const statusLinks: Record<string, Status> = {
  "/account/posts/active": Status.ACTIVE,
  "/account/posts/inactive": Status.INACTIVE,
  "/account/posts/pending": Status.PENDING,
  "/account/posts/rejected": Status.REJECTED,
}

export const MyPosts = () => {
  const { productsByUserId: products, getProductsByUserId } = useProduct()
  const location = useLocation()
  const { User } = useContext(UserContext)

  const [productName, setProductName] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection | null>(null)

  const getPosts = () => {
    if (User) {
      getProductsByUserId(
        User.userId,
        statusLinks[location.pathname],
        productName,
        category,
        sortField,
        sortDirection,
      )
    }
  }

  useEffect(() => {
    getPosts()
  }, [
    location.pathname,
    getProductsByUserId,
    category,
    sortField,
    sortDirection,
    User,
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      getPosts()
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [productName])

  return (
    <MyPostsContext.Provider
      value={{
        productName,
        setProductName,
        setCategory,
        setSortField,
        setSortDirection,
      }}
    >
      <div className="account__main">
        <AccountSubMenu />
        <MyPostsFilters />
        <hr />

        <div className="account-product-card">
          <input type="checkbox" className="checkbox" />
          <p className="account-product-card-title">
            Оберіть усі потрібні оголошення зі списку, щоб застосувати до них
            однакові дії
          </p>
        </div>
        {products.map((product) => {
          return <ProductCard key={product.productId} product={product} />
        })}
      </div>
    </MyPostsContext.Provider>
  )
}
