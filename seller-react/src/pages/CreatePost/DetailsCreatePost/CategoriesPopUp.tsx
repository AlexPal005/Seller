import {Category} from "../../../Hooks/Category.tsx";
import './categories-popup.scss'
import {IoClose} from "react-icons/io5";
import {useContext, useEffect} from "react";
import {PostContext} from "../CreatePost.tsx";

interface CategoriesPopUpProps {
    categories: Category[];
    closeModal: () => void;
}

interface CategoryItemProps {
    category: Category;
    closeModal: () => void;
}

export const CategoriesPopUp = ({categories, closeModal}: CategoriesPopUpProps) => {
    useEffect(() => {
        console.log(categories)
    }, [categories])

    return (
        <div className='modal-wrapper'>
            <div className='modal modal-categories'>
                <h1>Виберіть категорію</h1>
                <div className='modal-categories__list'>
                    {
                        categories.length ?
                            <>
                                {
                                    categories.map(category => {
                                        return <CategoryItem category={category} key={category.id}
                                                             closeModal={closeModal}/>
                                    })
                                }
                            </> :
                            <p className='modal_error'>
                                Нічого не знайдено
                            </p>


                    }
                </div>
                <IoClose className='modal__close-button' onClick={closeModal}/>
            </div>
            <div className="overlay" onClick={closeModal}></div>
        </div>
    )
}

const CategoryItem = ({category, closeModal}: CategoryItemProps) => {

    const {setCategoryId} = useContext(PostContext)

    const onClickCategory = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setCategoryId(category.id)
        closeModal()
    }
    return (
        <div className='category-item' onClick={onClickCategory}>
            <img alt={category.name} src={`data:image/jpeg;base64,${category.image}`} className='category-item__image'/>
            <p className='category-item__text'>{category.name}</p>
        </div>
    )
}