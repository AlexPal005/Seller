import './search.scss'
import {Button} from "../Button/Button.tsx";
import {IoSearchOutline} from "react-icons/io5";

export const Search = () => {
    return (
        <div className='search'>
            <IoSearchOutline className='search__icon-search'/>
            <input type='text' className='search__text' placeholder='Що шукаєте?'/>
            <input type='text' className='search__region' placeholder='Уся Україна'/>
            <Button text={'Пошук'} onClick={() => {
            }} className='search__button'/>
        </div>
    )
}

