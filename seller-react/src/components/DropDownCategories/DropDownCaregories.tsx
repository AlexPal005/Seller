import './drop-down-categories.scss'
import './../SearchTable/search-table.scss'
import {Category, useCategory} from "../../Hooks/Category.tsx";
import React, {useContext, useEffect, useState} from "react";
import {MainPageContext} from "../../pages/Main/Main/Main.tsx";

export const DropDownCategories = () => {
    const [isClickedCategories, setIsClickedCategories] = useState(false)
    const [selectedCategory, setSelectedCategory] =
        useState<Category | null>(null)
    const {setCategory, search} = useContext(MainPageContext)
    const {categories, getAllCategories} = useCategory()
    const [categoriesLoaded, setCategoriesLoaded] = useState(false)

    useEffect(() => {
        getAllCategories()
        setCategoriesLoaded(true)

    }, [getAllCategories])

    useEffect(() => {
        if (categoriesLoaded) {
            search()
        }
    }, [search, selectedCategory])

    return (
        <div className='drop-down-categories'>
            <div className='drop-down-categories__button'
                 onClick={() => {
                     setIsClickedCategories(prev => !prev)
                 }}
            >
                <span className='drop-down-categories__button-text'>
                    {
                        selectedCategory ? selectedCategory.name : 'Будь-яка категорія'
                    }
                </span>
            </div>
            {
                isClickedCategories ?
                    <div className='search-table table-categories'>
                        <div className='search-table-item' onClick={() => {
                            setIsClickedCategories(false)
                            setSelectedCategory(null)
                            setCategory('')
                        }}>
                            Будь-яка категорія
                        </div>
                        {
                            categories.map(category => {
                                if (!category.parentId) {
                                    return (
                                        <DropDownCategoriesItem
                                            category={category}
                                            key={category.id}
                                            setIsClickedCategories={setIsClickedCategories}
                                            setSelectedCategory={setSelectedCategory}
                                        />
                                    )
                                }
                            })
                        }
                    </div> :
                    <></>
            }

        </div>
    )
}

type DropDownCategoriesItemProps = {
    category: Category;
    setIsClickedCategories: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}
const DropDownCategoriesItem = ({
                                    category,
                                    setIsClickedCategories,
                                    setSelectedCategory
                                }: DropDownCategoriesItemProps) => {
    const {setCategory} = useContext(MainPageContext)
    const onClickCategory = () => {
        setCategory(category.name)
        setIsClickedCategories(false)
        setSelectedCategory(category)
    }
    return (
        <div className='search-table-item' onClick={onClickCategory}>
            {category.name}
        </div>
    )
}