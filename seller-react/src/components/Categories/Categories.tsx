import './categories.scss'
import {useState} from "react"
import {Category} from "./Category.tsx"


export const Categories = () => {
    const [isClickedCategory, setIsClickedCategory] = useState(false);

    const [indexClicked, setIndexClicked] = useState(-1)
    const [categories] = useState([
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
                            <Category
                                key={index}
                                img={category.img}
                                text={category.text}
                                index={index}
                                indexClicked={indexClicked}
                                setIndexClicked={setIndexClicked}
                                isClickedCategory={isClickedCategory}
                                setIsClickedCategory={setIsClickedCategory}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}