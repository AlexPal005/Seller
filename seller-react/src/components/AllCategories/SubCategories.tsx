import './all-categories.scss'
import {useEffect, useState} from "react";
import {IoIosArrowForward} from "react-icons/io";
import {Category, useCategory} from "../../Hooks/Category.tsx";

interface subCategoryItemProps {
    subCategoryItem: Category;
}

const SubCategoryItem = ({subCategoryItem}: subCategoryItemProps) => {
    return (
        <div className='all-categories__sub-category'>
            <IoIosArrowForward/>
            <p>{subCategoryItem.name}</p>
        </div>
    )
}

interface subCategoriesProps {
    index: number;
    categoryId: number;
}

export const SubCategories = ({index, categoryId}: subCategoriesProps) => {
    const [currPositionStyle, setCurrPositionStyle] = useState('')
    const {subCategories, getSubCategoriesByCategoryId} = useCategory()

    useEffect(() => {
        if (index < 8) {
            setCurrPositionStyle('all-categories_2-position')
        } else {
            setCurrPositionStyle('all-categories_4-position')
        }
    }, [index])

    useEffect(() => {
        getSubCategoriesByCategoryId(categoryId)
    }, [categoryId, getSubCategoriesByCategoryId]);

    useEffect(() => {
        console.log(categoryId)
    }, [categoryId]);

    return (
        <div className={'all-categories ' + currPositionStyle}>
            <div className='all-categories__title-block'>
                <IoIosArrowForward/>
                <p className='all-categories__title'>Переглянути всі оголошення в &nbsp;</p> <span>Дитячий світ</span>
            </div>
            <hr/>
            <div className='all-categories__sub-categories'>
                {
                    subCategories &&
                    subCategories.map(subCategory => {
                        return (
                            <SubCategoryItem subCategoryItem={subCategory} key={subCategory.id}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
