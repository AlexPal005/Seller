import './all-categories.scss'
import {useEffect, useState} from "react";
import {IoIosArrowForward} from "react-icons/io";

type subCategoryItemModel = {
    id: number,
    subCategory: string
}

interface subCategoryItemProps {
    subCategoryItem: subCategoryItemModel;
}

const SubCategoryItem = ({subCategoryItem}: subCategoryItemProps) => {
    return (
        <div className='all-categories__sub-category'>
            <IoIosArrowForward/>
            <p>{subCategoryItem.subCategory}</p>
        </div>
    )
}

interface allCategoriesProps {
    index: number;
}

export const AllCategories = ({index}: allCategoriesProps) => {
    const [currPositionStyle, setCurrPositionStyle] = useState('')

    const [subCategories] = useState([
        {
            id: 0,
            subCategory: "Дитячий одяг"
        },
        {
            id: 0,
            subCategory: "Дитячі меблі"
        },
        {
            id: 0,
            subCategory: "Товари для школярів"
        },
        {
            id: 0,
            subCategory: "Дитяче взуття"
        },

    ])

    useEffect(() => {
        if (index < 8) {
            setCurrPositionStyle('all-categories_2-position')
        } else {
            setCurrPositionStyle('all-categories_4-position')
        }
    }, [index])

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
                            <SubCategoryItem subCategoryItem={subCategory}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
