import { AccountSubMenu } from "../AccountSubMenu/AccountSubMenu.tsx"
import { MyPostsFilters } from "../MyPostsFilters/MyPostsFilters.tsx"
import { ProductCard } from "../ProductCard/ProductCard.tsx"
import React, { createContext, useContext, useEffect, useState } from "react"
import { Status, useProduct } from "../../../Hooks/Product.tsx"
import { useLocation } from "react-router-dom"
import { UserContext } from "../../../App.tsx"
import { Preloader } from "../../../components/Preloader/Preloader.tsx"

type MyPostsContextType = {
  productName: string
  setProductName: React.Dispatch<React.SetStateAction<string>>
}
const myPostsContextDefault = {
  productName: "",
  setProductName: () => {},
}
export const MyPostsContext = createContext<MyPostsContextType>(
  myPostsContextDefault,
)

export const MyPosts = () => {
  const {
    productsByUserId: products,
    getProductsByUserId,
    isLoadingProducts,
  } = useProduct()
  const location = useLocation()
  const { User } = useContext(UserContext)

  const [productName, setProductName] = useState<string>("")

  useEffect(() => {
    const timer = setTimeout(() => {
      if (User) {
        if (location.pathname === "/account/posts/active") {
          getProductsByUserId(User.userId, Status.ACTIVE, productName)
        } else if (location.pathname === "/account/posts/inactive") {
          getProductsByUserId(User.userId, Status.INACTIVE, productName)
        } else if (location.pathname === "/account/posts/pending") {
          getProductsByUserId(User.userId, Status.PENDING, productName)
        } else if (location.pathname === "/account/posts/rejected") {
          getProductsByUserId(User.userId, Status.REJECTED, productName)
        }
      }
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [location.pathname, getProductsByUserId, productName, User])

  return (
    <MyPostsContext.Provider
      value={{
        productName,
        setProductName,
      }}
    >
      <div className="account__main">
        <AccountSubMenu />
        <MyPostsFilters />
        <hr />
        {isLoadingProducts ? (
          <Preloader />
        ) : (
          <>
            <div className="account-product-card">
              <input type="checkbox" className="checkbox" />
              <p className="account-product-card-title">
                Оберіть усі потрібні оголошення зі списку, щоб застосувати до
                них однакові дії
              </p>
            </div>
            {products.map((product) => {
              return <ProductCard key={product.productId} product={product} />
            })}
          </>
        )}
      </div>
    </MyPostsContext.Provider>
  )
}
