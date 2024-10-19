import './serach-page-filters.scss'
import {DropDownCategories} from "../../../components/DropDownCategories/DropDownCaregories.tsx";
import {useContext} from "react";
import {MainPageContext} from "../Main/Main.tsx";

export const SearchPageFilters = () => {
    const {
        setPriceFrom,
        setPriceTo
    } = useContext(MainPageContext)

    const onChangePriceFrom = (e: { target: { value: string; }; }) => {
        if (!e.target.value) {
            setPriceFrom(-1)
        } else {
            setPriceFrom(Number(e.target.value))
        }

    }

    const onChangePriceTo = (e: { target: { value: string; }; }) => {
        if (!e.target.value) {
            setPriceTo(-1)
        } else {
            setPriceTo(Number(e.target.value))
        }

    }

    return (
        <div className='search-page-filters'>
            <h2>Фільтри</h2>
            <div className='search-page-filters__category-block'>
                <div className='search-page-filters__category'>
                    <p>Категорія</p>
                    <DropDownCategories/>
                </div>
                <div>
                    <p>Ціна</p>
                    <input type='number' placeholder='Від'
                           className='search-page-filters__input search-page-filters__input-price'
                           onChange={onChangePriceFrom}
                    />
                    <input type='number' placeholder='До'
                           className='search-page-filters__input search-page-filters__input-price'
                           onChange={onChangePriceTo}
                    />
                </div>
            </div>
            <hr/>
            <div className='search-page-filters__sorting'>
                <div>
                    <p>Сортувати за</p>
                    <input type='text'
                           className='search-page-filters__input search-page-filters__input-sort'
                           placeholder='Рекомендоване'
                    />
                </div>
            </div>
        </div>
    )
}