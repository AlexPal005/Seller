import "./drop-down-categories.scss"
import "./../SearchTable/search-table.scss"
import React, { createContext, useContext, useEffect, useState } from "react"
import { DropDownSubCategories } from "./DropDownSubCategories.tsx"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"
import { Preloader } from "../Preloader/Preloader.tsx"
import { Category, useGetAllCategories } from "../../query/category.ts"
import { useClickOutside } from "../../Hooks/useClickOutside.ts"

type DropDownCategoriesType = {
  setIsClickedCategories: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>
}
const DefaultDropDownCategoriesContext = {
  setIsClickedCategories: () => {
    console.log("SetIsClickedCategories default!")
  },
  setSelectedCategory: () => {
    console.log("SetSelectedCategory default!")
  },
}
export const DropDownCategoriesContext = createContext<DropDownCategoriesType>(
  DefaultDropDownCategoriesContext,
)

interface DropDownCategoriesProps {
  selectedCategoryDefault?: Category | null
  setCategory?: React.Dispatch<React.SetStateAction<string>>
}
export const DropDownCategories = ({
  selectedCategoryDefault,
  setCategory,
}: DropDownCategoriesProps) => {
  const [isClickedCategories, setIsClickedCategories] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    selectedCategoryDefault || null,
  )
  const dropdownRef = useClickOutside(() => setIsClickedCategories(false))
  const { isLoading, data: categories } = useGetAllCategories()

  useEffect(() => {
    if (selectedCategory && setCategory) {
      setCategory(selectedCategory.name)
    }
  }, [selectedCategory, setCategory])

  return (
    <DropDownCategoriesContext.Provider
      value={{
        setIsClickedCategories,
        setSelectedCategory,
      }}
    >
      <div className="drop-down-categories" ref={dropdownRef}>
        <div
          className="drop-down-categories__button"
          onClick={() => {
            setIsClickedCategories((prev) => !prev)
          }}
        >
          {isLoading ? (
            <Preloader />
          ) : (
            <>
              <span className="drop-down-categories__button-text">
                {selectedCategory
                  ? selectedCategory.name
                  : "Будь-яка категорія"}
              </span>
              <IoIosArrowDown
                className={`drop-down-categories__arrow ${isClickedCategories && "drop-down-categories__arrow_rotate"}`}
              />
            </>
          )}
        </div>
        {isClickedCategories ? (
          <div className="search-table table-categories">
            {isLoading ? (
              <Preloader />
            ) : (
              <>
                <div
                  className="search-table-item"
                  onClick={() => {
                    setIsClickedCategories(false)
                    setSelectedCategory(null)
                    if (setCategory) {
                      setCategory("")
                    }
                  }}
                >
                  Будь-яка категорія
                </div>
                {categories?.map((cat) => {
                  if (!cat.parentId) {
                    //create a list of subCategories
                    const subCategories = categories.filter((subCategory) => {
                      return subCategory.parentId === cat.id
                    })
                    return (
                      <DropDownCategoriesItem
                        category={cat}
                        key={cat.id}
                        setSelectedCategory={setSelectedCategory}
                        subCategories={subCategories}
                      />
                    )
                  }
                })}
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </DropDownCategoriesContext.Provider>
  )
}

type DropDownCategoriesItemProps = {
  category: Category
  subCategories: Category[]
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>
}
const DropDownCategoriesItem = ({
  category,
  setSelectedCategory,
  subCategories,
}: DropDownCategoriesItemProps) => {
  const [isHoverCategory, setIsHoverCategory] = useState(false)
  const { setIsClickedCategories } = useContext(DropDownCategoriesContext)
  const onClickCategory = () => {
    setIsClickedCategories(false)
    setSelectedCategory(category)
  }

  return (
    <div
      className="search-table-item"
      onClick={onClickCategory}
      onMouseOver={() => setIsHoverCategory(true)}
      onMouseOut={() => setIsHoverCategory(false)}
    >
      <span>{category.name}</span>
      {subCategories.length ? <IoIosArrowForward /> : <></>}
      {isHoverCategory && <DropDownSubCategories categories={subCategories} />}
    </div>
  )
}
