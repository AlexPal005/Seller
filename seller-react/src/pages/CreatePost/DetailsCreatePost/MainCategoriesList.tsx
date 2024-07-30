import {useContext} from "react";
import {Category} from "../../../Hooks/Category.tsx";
import {DetailsCreatePostContext} from "./DetailsCreatePost.tsx";

export const MainCategoriesList = () => {
    const {categories} = useContext(DetailsCreatePostContext)

    return (
        <div className='modal-categories__list'>
            {
                categories.length ?
                    <>
                        {
                            categories.map(category => {
                                if (!category?.parentId) {
                                    return <CategoryItem category={category} key={category.id}/>
                                }
                            })
                        }
                    </> :
                    <p className='modal_error'>
                        Нічого не знайдено
                    </p>


            }
        </div>
    )
}

interface CategoryItemProps {
    category: Category;
}

const CategoryItem = ({category}: CategoryItemProps) => {

    const {setMainCategoryId} = useContext(DetailsCreatePostContext)

    const onClickCategory = () => {
        setMainCategoryId(category.id)
    }
    return (
        <div className='category-item' onClick={onClickCategory}>
            <img alt={category.name} src={`data:image/jpeg;base64,${category.image}`} className='category-item__image'/>
            <p className='category-item__text'>{category.name}</p>
        </div>
    )
}