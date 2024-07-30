import './categories-popup.scss'
import {IoClose} from "react-icons/io5";
import {MainCategoriesList} from "./MainCategoriesList.tsx";
import {AllCategories} from "./AllCategories/AllCategories.tsx";
import {useContext} from "react";
import {DetailsCreatePostContext} from "./DetailsCreatePost.tsx";

interface CategoriesPopUpProps {
    closeModal: () => void;
}

export const CategoriesPopUp = ({closeModal}: CategoriesPopUpProps) => {
    const {mainCategoryId} = useContext(DetailsCreatePostContext)

    return (
        <div className='modal-wrapper'>
            <div className='modal modal-categories'>
                <h1>Виберіть категорію</h1>
                {
                    mainCategoryId === -1 ?
                        <MainCategoriesList/> :
                        <AllCategories/>

                }
                <IoClose className='modal__close-button' onClick={closeModal}/>
            </div>
            <div className="overlay" onClick={closeModal}></div>
        </div>
    )
}

