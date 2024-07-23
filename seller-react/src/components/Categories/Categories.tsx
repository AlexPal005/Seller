import './categories.scss'
import {useEffect, useState} from "react"
import {Category} from "./Category.tsx"
import {useCategory} from "../../Hooks/Category.tsx";
import {Preloader} from "../Preloader/Preloader.tsx";


export const Categories = () => {
    const [isClickedCategory, setIsClickedCategory] = useState(false);

    const [indexClicked, setIndexClicked] = useState(-1)
    const {categories, getAllCategories} = useCategory()

    useEffect(() => {
        getAllCategories()
    }, [getAllCategories]);

    return (
        <div className='categories'>
            <h1>Категорії</h1>

            {
                categories.length ?
                    <div className='categories__menu'>
                        {
                            categories.map((category, index) => {
                                if (!category?.parentId) {
                                    return (
                                        <Category
                                            key={index}
                                            categoryId={category.id}
                                            img={`data:image/jpeg;base64,${category.image}`}
                                            text={category.name}
                                            index={index}
                                            indexClicked={indexClicked}
                                            setIndexClicked={setIndexClicked}
                                            isClickedCategory={isClickedCategory}
                                            setIsClickedCategory={setIsClickedCategory}
                                        />
                                    )
                                }
                            })

                        }
                    </div> :
                    <Preloader/>
            }
        </div>
    )
}