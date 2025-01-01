import "./all-categories.scss"
import { useEffect, useState } from "react"
import { IoIosArrowForward } from "react-icons/io"
import { Category } from "../../query/category.ts"
import { Link } from "react-router-dom"

interface subCategoryItemProps {
  subCategoryItem: Category
}

const SubCategoryItem = ({ subCategoryItem }: subCategoryItemProps) => {
  return (
    <Link
      to={`/search/${subCategoryItem.name}`}
      className="all-categories__sub-category"
    >
      <IoIosArrowForward />
      <p>{subCategoryItem.name}</p>
    </Link>
  )
}

interface subCategoriesProps {
  index: number
  mainCategory: string
  subCategories: Category[]
}

export const SubCategories = ({
  index,
  mainCategory,
  subCategories,
}: subCategoriesProps) => {
  const [currPositionStyle, setCurrPositionStyle] = useState("")

  useEffect(() => {
    if (index < 8) {
      setCurrPositionStyle("all-categories_2-position")
    } else {
      setCurrPositionStyle("all-categories_4-position")
    }
  }, [index])

  return (
    <div className={"all-categories " + currPositionStyle}>
      <div className="all-categories__title-block">
        <IoIosArrowForward />
        <p className="all-categories__title">
          Переглянути всі оголошення в &nbsp;
        </p>
        <Link
          to={`/search/${mainCategory}`}
          className="all-categories__title-link"
        >
          {mainCategory}
        </Link>
      </div>
      <hr />
      <div className="all-categories__sub-categories">
        {subCategories &&
          subCategories.map((subCategory) => {
            return (
              <SubCategoryItem
                subCategoryItem={subCategory}
                key={subCategory.id}
              />
            )
          })}
      </div>
    </div>
  )
}
