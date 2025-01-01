import { IoIosArrowDown } from "react-icons/io"
import { useContext, useEffect, useState } from "react"
import { MyPostsContext } from "../../MyPosts.tsx"
import { SortDirection, SortField } from "../../../../../Hooks/Product.tsx"
import { useClickOutside } from "../../../../../Hooks/useClickOutside.ts"

interface SortItem {
  text: string
  sortField: SortField
  sortDirection: SortDirection
}
const sortItems: SortItem[] = [
  {
    text: "Заголовок А-Я",
    sortField: SortField.PRODUCT_NAME,
    sortDirection: SortDirection.ASCENDING,
  },
  {
    text: "Заголовок Я-А",
    sortField: SortField.PRODUCT_NAME,
    sortDirection: SortDirection.DESCENDING,
  },
  {
    text: "Ціна: найнижча",
    sortField: SortField.PRICE,
    sortDirection: SortDirection.ASCENDING,
  },
  {
    text: "Ціна: найвижча",
    sortField: SortField.PRICE,
    sortDirection: SortDirection.DESCENDING,
  },
  {
    text: "Час публікації: Давно",
    sortField: SortField.CREATED_AT,
    sortDirection: SortDirection.ASCENDING,
  },
  {
    text: "Час публікації: Нещодавно",
    sortField: SortField.CREATED_AT,
    sortDirection: SortDirection.DESCENDING,
  },
]

export const Sorting = () => {
  const [showList, setShowList] = useState(false)
  const { setSortField, setSortDirection } = useContext(MyPostsContext)
  const [selectedItem, setSelectedItem] = useState<SortItem>(sortItems[0])
  const dropdownRef = useClickOutside(() => setShowList(false))

  useEffect(() => {
    setSortField(selectedItem.sortField)
    setSortDirection(selectedItem.sortDirection)
  }, [selectedItem])

  return (
    <div className="drop-down-categories" ref={dropdownRef}>
      <div
        className="drop-down-categories__button"
        onClick={() => {
          setShowList((prev) => !prev)
        }}
      >
        <span className="drop-down-categories__button-text">
          {selectedItem.text}
        </span>
        <IoIosArrowDown
          className={`drop-down-categories__arrow ${showList && "drop-down-categories__arrow_rotate"}`}
        />
      </div>
      {showList && (
        <div className="search-table table-categories">
          {sortItems.map((item) => (
            <div
              className="search-table-item"
              onClick={() => {
                setShowList(false)
                setSelectedItem(item)
              }}
            >
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
