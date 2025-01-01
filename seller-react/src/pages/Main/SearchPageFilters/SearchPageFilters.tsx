import "./serach-page-filters.scss"
import { DropDownCategories } from "../../../components/DropDownCategories/DropDownCaregories.tsx"
import { useContext, useEffect, useState } from "react"
import { MainPageContext } from "../Main/Main.tsx"
import { useNavigate, useParams } from "react-router-dom"
import { Category, useGetAllCategories } from "../../../query/category.ts"

export const SearchPageFilters = () => {
  const {
    category: categoryRes,
    setPriceFrom,
    setPriceTo,
    search,
    isCategorySet,
    setCategory,
    setIsCategorySet,
  } = useContext(MainPageContext)
  const { category } = useParams()
  const navigate = useNavigate()

  const { data: categories } = useGetAllCategories()

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  )

  useEffect(() => {
    if (category) {
      setCategory(category)
    }
    setIsCategorySet(true)
  }, [category])

  // redirect to url with category
  useEffect(() => {
    if (isCategorySet) {
      if (categoryRes) {
        navigate(`/search/${categoryRes}`, { replace: true })
      } else {
        navigate("/search", { replace: true })
      }
    }
  }, [categoryRes, isCategorySet])

  useEffect(() => {
    if (isCategorySet) {
      search()
    }
  }, [category, isCategorySet])

  // if the page has a category in the url set category
  useEffect(() => {
    if (isCategorySet && categories?.length) {
      const categoryObj = categories.find((c) => c.name === category)
      setSelectedCategory(categoryObj || null)
    }
  }, [isCategorySet, categories])

  const onChangePriceFrom = (e: { target: { value: string } }) => {
    if (!e.target.value) {
      setPriceFrom(-1)
    } else {
      setPriceFrom(Number(e.target.value))
    }
  }

  const onChangePriceTo = (e: { target: { value: string } }) => {
    if (!e.target.value) {
      setPriceTo(-1)
    } else {
      setPriceTo(Number(e.target.value))
    }
  }

  return (
    <div className="search-page-filters">
      <h2>Фільтри</h2>
      <div className="search-page-filters__category-block">
        <div className="search-page-filters__category">
          <p>Категорія</p>
          <div className="search-page-filters__category-wrapper">
            <DropDownCategories
              selectedCategoryDefault={selectedCategory}
              setCategory={setCategory}
            />
          </div>
        </div>
        <div>
          <p>Ціна</p>
          <input
            type="number"
            placeholder="Від"
            className="search-page-filters__input search-page-filters__input-price"
            onChange={onChangePriceFrom}
          />
          <input
            type="number"
            placeholder="До"
            className="search-page-filters__input search-page-filters__input-price"
            onChange={onChangePriceTo}
          />
        </div>
      </div>
      <hr />
      <div className="search-page-filters__sorting">
        <div>
          <p>Сортувати за</p>
          <input
            type="text"
            className="search-page-filters__input search-page-filters__input-sort"
            placeholder="Рекомендоване"
          />
        </div>
      </div>
    </div>
  )
}
