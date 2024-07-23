import {IoIosArrowDown} from "react-icons/io";
import React, {useContext, useEffect, useState} from "react";
import {useCategory} from "../../../Hooks/Category.tsx";
import {CategoriesPopUp} from "./CategoriesPopUp.tsx";
import {PostContext} from "../CreatePost.tsx";

type DetailsCreatePostProps = {
    categoryId: number
}
export const DetailsCreatePost = ({categoryId}: DetailsCreatePostProps) => {
    const [errorName, setErrorName] = useState("")
    const [isClickedCategories, setIsClickedCategories] = useState(false)
    const {categories, getAllCategories} = useCategory()
    const {setProductName} = useContext(PostContext)
    const [currentCategory, setCurrentCategory]
        = useState({id: -1, name: ""})

    useEffect(() => {
        if (categoryId !== -1) {
            categories.forEach(category => {
                if (category.id === categoryId) {
                    setCurrentCategory(category)
                    return
                }
            })
        }
    }, [categoryId, categories]);

    useEffect(() => {
        getAllCategories()
    }, [getAllCategories]);

    const onChangeProductName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        if (e.target.value.length < 16) {
            setErrorName("Заголовок надто короткий. Додайте більше деталей.")
        } else {
            setErrorName("")
            setProductName(e.target.value)
        }
    }

    const onClickSelectCategories = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setIsClickedCategories(true)
    }

    const closeModal = () => {
        setIsClickedCategories(false)
    }
    return (

        <div className='create-post-details white-block'>
            <h4>Деталі оголошення</h4>
            <form>
                <div className='create-post-container__wrapper'>
                    <p className='blue-text-16'>Вкажіть назву</p>
                    <input
                        id='product-name'
                        className='create-post-details__name'
                        type='text'
                        placeholder='Наприклад, xiaomi redmi note 9 pro'
                        onChange={onChangeProductName}
                    />
                    {errorName && <p className="error">{errorName}</p>}
                </div>
                <div className='create-post-container__wrapper'>
                    <p className='blue-text-16'>Категорія</p>
                    <button
                        className='create-post-details__category-button'
                        onClick={onClickSelectCategories}
                    >
                        {
                            currentCategory.id === -1 ?
                                <span>Виберіть категорію</span> :
                                <span>{currentCategory.name}</span>

                        }
                        <IoIosArrowDown className='icon-arrow'/>
                    </button>
                </div>
            </form>
            {isClickedCategories &&
                <CategoriesPopUp categories={categories} closeModal={closeModal}/>}
        </div>
    )
}