import { Category } from "../../query/category.ts"
import "./drop-down-categories.scss"
import { useContext } from "react"
import { MainPageContext } from "../../pages/Main/Main/Main.tsx"
import { DropDownCategoriesContext } from "./DropDownCaregories.tsx"

type DropDownSubCategoriesProps = {
  categories: Category[]
}
export const DropDownSubCategories = ({
  categories,
}: DropDownSubCategoriesProps) => {
  return (
    <div className="search-table table-categories sub-categories">
      {categories.map((category) => {
        return (
          <DropDownSubCategoriesItem category={category} key={category.id} />
        )
      })}
    </div>
  )
}

type DropDownSubCategoriesItemProps = {
  category: Category
}
const DropDownSubCategoriesItem = ({
  category,
}: DropDownSubCategoriesItemProps) => {
  const { setCategory } = useContext(MainPageContext)
  const { setIsClickedCategories, setSelectedCategory } = useContext(
    DropDownCategoriesContext,
  )
  const onClickCategory = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    setCategory(category.name)
    setIsClickedCategories(false)
    setSelectedCategory(category)
  }

  return (
    <div className="search-table-item" onClick={onClickCategory}>
      {category.name}
    </div>
  )
}
