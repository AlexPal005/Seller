import './categories.scss'
import {useState} from "react";

interface categoryProps {
    img: string;
    text: string;

}

const Category = ({img, text}: categoryProps) => {
    return (
        <div className='categories__item-menu'>
            <figure>
                <div className='categories__photo-circle'>
                    <img src={img} alt='text' className='categories__image'/>
                </div>
                <figcaption className='categories__photo-description'>{text}</figcaption>
            </figure>
        </div>
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
                    categories.map(category => {
                        return (
                            <Category img={category.img} text={category.text}/>
                        )
                    })
                }
            </div>
        </div>
    )
}