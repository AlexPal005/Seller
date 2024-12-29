import "./categories.scss"
import { useState } from "react"
import { Preloader } from "../Preloader/Preloader.tsx"
import { useQuery } from "@tanstack/react-query"
import {
  Category as CategoryType,
  getAllCategories,
} from "../../endpoints/category.ts"
import { Category } from "./Category.tsx"

export const Categories = () => {
  const [isClickedCategory, setIsClickedCategory] = useState(false)
  const [indexClicked, setIndexClicked] = useState(-1)

  const { isLoading, data: categories } = useQuery<CategoryType[]>({
    queryKey: ["getAllCategories"],
    queryFn: getAllCategories,
  })

  return (
    <div className="categories">
      <h1>Категорії</h1>

      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {categories?.length && (
            <div className="categories__menu">
              {categories.map((category, index) => {
                if (!category?.parentId) {
                  return (
                    <Category
                      key={index}
                      categoryId={category.id}
                      img={`data:image/jpeg;base64,${category.image}`}
                      text={category.name}
                      index={index}
                      indexClicked={indexClicked}
                      setIndexClicked={setIndexClicked}
                      isClickedCategory={isClickedCategory}
                      setIsClickedCategory={setIsClickedCategory}
                    />
                  )
                }
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
