import './categories.scss'
import {useState} from "react"
import {Category} from "./Category.tsx"
import {useCategory} from "../../Hooks/Category.tsx";
import {Preloader} from "../Preloader/Preloader.tsx";


export const Categories = () => {
    const [isClickedCategory, setIsClickedCategory] = useState(false);

    const [indexClicked, setIndexClicked] = useState(-1)
    const {categories} = useCategory()

    return (
        <div className='categories'>
            <h1>Категорії</h1>

            {
                categories.length ?
                    <div className='categories__menu'>
                        {
                            categories.map((category, index) => {
                                return (
                                    <Category
                                        key={index}
                                        img={`data:image/jpeg;base64,${category.image}`}
                                        text={category.name}
                                        index={index}
                                        indexClicked={indexClicked}
                                        setIndexClicked={setIndexClicked}
                                        isClickedCategory={isClickedCategory}
                                        setIsClickedCategory={setIsClickedCategory}
                                    />
                                )
                            })

                        }
                    </div> :
                    <Preloader/>
            }
        </div>
    )
}