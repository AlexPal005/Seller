import './serach-page-filters.scss'
import {DropDownCategories} from "../../../components/DropDownCategories/DropDownCaregories.tsx";

export const SearchPageFilters = () => {
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
                           className='search-page-filters__input search-page-filters__input-price'/>
                    <input type='number' placeholder='До'
                           className='search-page-filters__input search-page-filters__input-price'/>
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