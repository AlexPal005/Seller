import "./my-posts-filters.scss"
import { SetStateAction, useContext } from "react"
import { MyPostsContext } from "../MyPosts/MyPosts.tsx"
import { DropDownCategoriesProfile } from "../DropDownCategoriesProfile/DropDownCategoriesProfile.tsx"

export const MyPostsFilters = () => {
  const { productName, setProductName } = useContext(MyPostsContext)

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
      <DropDownCategoriesProfile />
      <select
        className="my-posts-search-item my-posts-search-select"
        defaultValue={""}
      >
        <option style={{ display: "none" }} className="select-option">
          Сортувати
        </option>
        <option value="1" className="select-option">
          Заголовок А-Я
        </option>
        <option value="2" className="select-option">
          Заголовок Я-А
        </option>
        <option value="3" className="select-option">
          Час публікації
        </option>
      </select>
      <p className="my-posts-search-count">
        Всього оголошень: <span>6</span>
      </p>
    </div>
  )
}
