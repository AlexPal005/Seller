import {Dispatch, SetStateAction, useEffect} from "react";
import {SubCategories} from "../AllCategories/SubCategories.tsx";
import './categories.scss'
import {Link} from "react-router-dom";
import {useCategory} from "../../Hooks/Category.tsx";

interface categoryProps {
    categoryId: number;
    img: string;
    text: string;
    index: number;
    indexClicked: number;
    setIndexClicked: Dispatch<SetStateAction<number>>;
    isClickedCategory: boolean;
    setIsClickedCategory: Dispatch<SetStateAction<boolean>>;
    parentId?: number;
}

export const Category = ({
                             categoryId,
                             img,
                             text,
                             index,
                             indexClicked,
                             setIndexClicked,
                             isClickedCategory,
                             setIsClickedCategory
                         }: categoryProps) => {
    const {subCategories, getSubCategoriesByCategoryId} = useCategory()


    useEffect(() => {
        getSubCategoriesByCategoryId(categoryId)
    }, [categoryId, getSubCategoriesByCategoryId])

    const showSubCategories = () => {
        setIndexClicked(index)
        if (!isClickedCategory) {
            setIndexClicked(index)
            setIsClickedCategory(true)
        } else if (index === indexClicked) {
            setIsClickedCategory(false)
        }
    }

    return (
        <>
            <div className='categories__item-menu' onClick={showSubCategories}>
                {
                    subCategories.length ?
                        <figure>
                            <div className='categories__photo-circle'>
                                <img src={img} alt='text' className='categories__image'/>
                            </div>
                            <figcaption className='categories__photo-description'>{text}</figcaption>
                        </figure>
                        :
                        <Link to={`/search/${text}`} className='categories__item-menu__link'>
                            <figure>
                                <div className='categories__photo-circle'>
                                    <img src={img} alt='text' className='categories__image'/>
                                </div>
                                <figcaption className='categories__photo-description'>{text}</figcaption>
                            </figure>
                        </Link>
                }
            </div>
            {
                isClickedCategory && index === indexClicked &&
                <SubCategories
                    index={indexClicked}
                    key={categoryId}
                    subCategories={subCategories}
                    mainCategory={text}
                />
            }
        </>
    )
}