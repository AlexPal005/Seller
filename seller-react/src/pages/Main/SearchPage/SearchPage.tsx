import './search-page.scss'
import {SearchPageAddFavorites} from "../SearchPageAddFavorites/SearchPageAddFavorites.tsx";
import {SearchPageFilters} from "../SearchPageFilters/SearchPageFilters.tsx";
import {SearchPageProducts} from "../SearchPageProducts/SearchPageProducts.tsx";


export const SearchPage = () => {
    return (
        <div className='search-page'>
            <SearchPageAddFavorites/>
            <SearchPageFilters/>
            <SearchPageProducts/>
        </div>
    )
}