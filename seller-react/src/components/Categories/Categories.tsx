import './categories.scss'
import {useState} from "react";
import {AllCategories} from "../AllCategories/AllCategories.tsx";

interface categoryProps {
    img: string;
    text: string;
    index: number;
}

const Category = ({img, text, index}: categoryProps) => {
    const [isClickedCategory, setIsClickedCategory] = useState(false);

    const showAllCategories = () => {
        setIsClickedCategory(prev => !prev);
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
            {isClickedCategory && <AllCategories index={index}/>}
        </>
    )
}
export const Categories = () => {

    const [categories, setCaregories] = useState([
            {
                img: 'src/assets/detskiy-mir-36-1x.png',
                text: 'Дитячий світ'
            },
            {
                img: 'src/assets/detskiy-mir-36-1x.png',
                text: 'Дитячий світ'
            },
            {
                img: 'src/assets/detskiy-mir-36-1x.png',
                text: 'Дитячий світ'
            },
            {
                img: 'src/assets/detskiy-mir-36-1x.png',
                text: 'Дитячий світ'
            },
            {
                img: 'src/assets/detskiy-mir-36-1x.png',
                text: 'Дитячий світ'
            },
            {
                img: 'src/assets/detskiy-mir-36-1x.png',
                text: 'Дитячий світ'
            },
            {
                img: 'src/assets/detskiy-mir-36-1x.png',
                text: 'Дитячий світ'
            },
            {
                img: 'src/assets/detskiy-mir-36-1x.png',
                text: 'Дитячий світ'
            },
            {
                img: 'src/assets/detskiy-mir-36-1x.png',
                text: 'Дитячий світ'
            },
            {
                img: 'src/assets/detskiy-mir-36-1x.png',
                text: 'Дитячий світ'
            },
            {
                img: 'src/assets/detskiy-mir-36-1x.png',
                text: 'Дитячий світ'
            },
            {
                img: 'src/assets/detskiy-mir-36-1x.png',
                text: 'Дитячий світ'
            },
        ]
    )
    return (
        <div className='categories'>
            <h1>Категорії</h1>
            <div className='categories__menu'>
                {
                    categories.map((category, index) => {
                        return (
                            <Category img={category.img} text={category.text} index={index}/>
                        )
                    })
                }
            </div>
        </div>
    )
}