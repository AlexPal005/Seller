import "./my-posts-filters.scss"
import { SetStateAction, useContext } from "react"
import { MyPostsContext } from "../MyPosts.tsx"
import { DropDownCategories } from "../../../../components/DropDownCategories/DropDownCaregories.tsx"
import { Sorting } from "./Sorting/Sorting.tsx"

export const MyPostsFilters = () => {
  const { setProductName, setCategory } = useContext(MyPostsContext)

  const handleProductName = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setProductName(e.target.value)
  }

  return (
    <div className="my-posts-search">
      <input
        type="text"
        placeholder="Шукати за заголовком"
        className="my-posts-search-item"
        onChange={handleProductName}
      />
      <div className="my-posts-search__item-categories">
        <DropDownCategories setCategory={setCategory} />
      </div>
      <div>
        <Sorting />
      </div>
      <p className="my-posts-search-count">
        Всього оголошень: <span>6</span>
      </p>
    </div>
  )
}
