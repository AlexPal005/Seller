import {Dispatch, SetStateAction} from "react";
import {AllCategories} from "../AllCategories/AllCategories.tsx";

interface categoryProps {
    img: string;
    text: string;
    index: number;
    indexClicked: number;
    setIndexClicked: Dispatch<SetStateAction<number>>;
    isClickedCategory: boolean;
    setIsClickedCategory: Dispatch<SetStateAction<boolean>>;
}

export const Category = ({
                             img,
                             text,
                             index,
                             indexClicked,
                             setIndexClicked,
                             isClickedCategory,
                             setIsClickedCategory
                         }: categoryProps) => {

    const showAllCategories = () => {
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
            <div className='categories__item-menu' onClick={showAllCategories}>
                <figure>
                    <div className='categories__photo-circle'>
                        <img src={img} alt='text' className='categories__image'/>
                    </div>
                    <figcaption className='categories__photo-description'>{text}</figcaption>
                </figure>
            </div>
            {isClickedCategory && index === indexClicked && <AllCategories index={indexClicked}/>}
        </>
    )
}