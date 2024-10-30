import './drop-down-categories.scss'
import './../SearchTable/search-table.scss'
import {Category, useCategory} from "../../Hooks/Category.tsx";
import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {MainPageContext} from "../../pages/Main/Main/Main.tsx";
import {DropDownSubCategories} from "./DropDownSubCategories.tsx";
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";

type DropDownCategoriesType = {
    setIsClickedCategories: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}
const DefaultDropDownCategoriesContext = {
    setIsClickedCategories: () => {
        console.log("SetIsClickedCategories default!")
    },
    setSelectedCategory: () => {
        console.log("setSelectedCategory default!")
    }
}
export const DropDownCategoriesContext =
    createContext<DropDownCategoriesType>(DefaultDropDownCategoriesContext)
export const DropDownCategories = () => {
    const [isClickedCategories, setIsClickedCategories] = useState(false)
    const [selectedCategory, setSelectedCategory] =
        useState<Category | null>(null)
    const {setCategory, search} = useContext(MainPageContext)
    const {categories, getAllCategories} = useCategory()
    const [categoriesLoaded, setCategoriesLoaded] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        getAllCategories()
        setCategoriesLoaded(true)

    }, [getAllCategories])

    useEffect(() => {
        if (categoriesLoaded) {
            search()
        }
    }, [search, selectedCategory])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsClickedCategories(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsClickedCategories]);


    return (
        <DropDownCategoriesContext.Provider value={{
            setIsClickedCategories,
            setSelectedCategory
        }}>
            <div className='drop-down-categories' ref={dropdownRef}>
                <div className='drop-down-categories__button'
                     onClick={() => {
                         setIsClickedCategories(prev => !prev)
                     }}
                >
                <span className='drop-down-categories__button-text'>
                    {
                        selectedCategory ? selectedCategory.name : 'Будь-яка категорія'
                    }
                </span>
                    <IoIosArrowDown/>
                </div>
                {
                    isClickedCategories ?
                        <div className='search-table table-categories'>
                            <div className='search-table-item' onClick={() => {
                                setIsClickedCategories(false)
                                setSelectedCategory(null)
                                setCategory('')
                            }}>
                                Будь-яка категорія
                            </div>
                            {
                                categories.map(category => {
                                    if (!category.parentId) {
                                        //create a list of subCategories
                                        const subCategories = categories.filter(subCategory => {
                                                return subCategory.parentId === category.id
                                            }
                                        )
                                        return (
                                            <DropDownCategoriesItem
                                                category={category}
                                                key={category.id}
                                                setSelectedCategory={setSelectedCategory}
                                                subCategories={subCategories}
                                            />
                                        )
                                    }
                                })
                            }
                        </div> :
                        <></>
                }

            </div>
        </DropDownCategoriesContext.Provider>
    )
}

type DropDownCategoriesItemProps = {
    category: Category;
    subCategories: Category[];
    setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}
const DropDownCategoriesItem = ({
                                    category,
                                    setSelectedCategory,
                                    subCategories
                                }: DropDownCategoriesItemProps) => {
    const {setCategory} = useContext(MainPageContext)
    const [isHoverCategory, setIsHoverCategory] = useState(false)
    const {setIsClickedCategories} = useContext(DropDownCategoriesContext)
    const onClickCategory = () => {
        setCategory(category.name)
        setIsClickedCategories(false)
        setSelectedCategory(category)

    }

    return (
        <div className='search-table-item' onClick={onClickCategory}
             onMouseOver={() => setIsHoverCategory(true)}
             onMouseOut={() => setIsHoverCategory(false)}
        >
            <span>{category.name}</span>
            {
                subCategories.length ? <IoIosArrowForward/> : <></>
            }
            {
                isHoverCategory &&
                <DropDownSubCategories categories={subCategories}/>
            }
        </div>
    )
}