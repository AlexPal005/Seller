import './search.scss'
import {Button} from "../Button/Button.tsx";
import {IoSearchOutline} from "react-icons/io5";
import {FaMapMarkerAlt} from "react-icons/fa";
import {SearchTable} from "../SearchTable/SearchTable.tsx";
import {useState} from "react";
import {SearchTableRegion} from "../SearchTableRegion/SearchTableRegion.tsx";

export const Search = () => {
    const [isClickedSearch, setIsClickedSearch] = useState(false)
    const [isClickedSearchRegion, setIsClickedSearchRegion] = useState(false)
    const showSearchTable = () => {
        setIsClickedSearch(true)
    }
    const hideSearchTable = () => {
        setIsClickedSearch(false)
    }
    const showSearchTableRegion = () => {
        setIsClickedSearchRegion(true)
    }
    const hideSearchTableRegion = () => {
        setIsClickedSearchRegion(false)
    }
    return (
        <div className='search'>
            <div className="search__block">
                <IoSearchOutline className='search__icon'/>
                <input type='text'
                       className='search__text'
                       placeholder='Що шукаєте?'
                       onFocus={showSearchTable}
                       onBlur={hideSearchTable}
                />
                {
                    isClickedSearch &&
                    <SearchTable/>
                }
            </div>
            <div className='search__block'>
                <input type='text'
                       className='search__region'
                       placeholder='Уся Україна'
                       onFocus={showSearchTableRegion}
                       onBlur={hideSearchTableRegion}
                />
                <FaMapMarkerAlt className='search__icon'/>
                {
                    isClickedSearchRegion &&
                    <SearchTableRegion/>
                }
            </div>
            <Button text={'Пошук'} onClick={() => {
            }} className='search__button'/>
        </div>
    )
}

