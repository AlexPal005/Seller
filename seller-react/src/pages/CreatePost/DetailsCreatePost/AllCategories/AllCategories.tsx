import {useContext, useEffect, useState} from "react";
import {PostContext} from "../../CreatePost.tsx";
import {DetailsCreatePostContext} from "../DetailsCreatePost.tsx";
import {Category} from "../../../../Hooks/Category.tsx";
import './all-categories.scss'
import {IoIosArrowForward} from "react-icons/io";


export const AllCategories = () => {
    const {setCategoryId} = useContext(PostContext);
    const {categories, closeModal, mainCategoryId, setMainCategoryId} = useContext(DetailsCreatePostContext);

    const [categoryLevels, setCategoryLevels] =
        useState<Category[][]>([categories.filter(c => !c.parentId)])

    const [selectedCategories, setSelectedCategories] =
        useState<number[]>([])

    const handleCategoryClick = (category: Category, level: number) => {
        createSubCategoriesList(category.id, level)
        createSelectedCategories(level, category.id)

        if (isLastLevel(level) && !hasSubCategories(category.id)) {
            setCategoryId(category.id)
            setMainCategoryId(-1)
            closeModal()
        }
    }

    const isLastLevel = (currentLevel: number) => {
        return (categoryLevels[currentLevel + 1] || []).length === 0;
    }

    const hasSubCategories = (categoryId: number) => {
        return categories.some(c => c.parentId === categoryId);
    }


    const createSubCategoriesList = (categoryId: number, level: number) => {
        const subCategories = categories.filter(c => c.parentId === categoryId)
        const newLevels = [...categoryLevels.slice(0, level + 1), subCategories]
        setCategoryLevels(newLevels)
    }

    const createSelectedCategories = (level: number, categoryId: number) => {
        const newSelectedCategories = [...selectedCategories.slice(0, level), categoryId]
        setSelectedCategories(newSelectedCategories)
    }

    useEffect(() => {
        createSelectedCategories(1, mainCategoryId)
        createSubCategoriesList(mainCategoryId, 1)
    }, [mainCategoryId])

    return (
        <div className='create-post-all-categories'>
            {categoryLevels.map((categoryLevel, index) => (
                <CategoryList
                    categories={categoryLevel}
                    onCategoryClick={(category) => handleCategoryClick(category, index)}
                    selectedCategoryId={selectedCategories[index]}
                    key={index}
                />
            ))}
        </div>
    )
}

interface CategoryListProps {
    categories: Category[]
    onCategoryClick: (category: Category) => void
    selectedCategoryId?: number
}

const CategoryList = ({categories, onCategoryClick, selectedCategoryId}: CategoryListProps) => {
    const {categories: allCategories} = useContext(DetailsCreatePostContext);

    return (
        <ul className='create-post-category-list'>
            {categories.map((category) => {
                const hasSubCategories = allCategories.some(c => c.parentId === category.id);

                return (
                    <li
                        key={category.id}
                        onClick={() => onCategoryClick(category)}
                        className={`create-post-category-list__item ${selectedCategoryId === category.id ? 'selected' : ''}`}
                    >
                        {category.name}
                        {hasSubCategories && <IoIosArrowForward/>}
                    </li>
                )
            })}
        </ul>
    )
}