import './search.scss'
import {Button} from "../Button/Button.tsx";
import {IoSearchOutline} from "react-icons/io5";
import {FaMapMarkerAlt} from "react-icons/fa";
import {SearchTable} from "../SearchTable/SearchTable.tsx";
import {useState} from "react";

export const Search = () => {
    const [isClickedSearch, setIsClickedSearch] = useState(false)

    const showSearchTable = () => {
        setIsClickedSearch(true)
    }
    const hideSearchTable = () => {
        setIsClickedSearch(false)
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
                <input type='text' className='search__region' placeholder='Уся Україна'/>
                <FaMapMarkerAlt className='search__icon'/>
            </div>
            <Button text={'Пошук'} onClick={() => {
            }} className='search__button'/>
        </div>
    )
}

