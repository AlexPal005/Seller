import './search.scss'
import {Button} from "../Button/Button.tsx";
import {IoSearchOutline} from "react-icons/io5";
import {SearchTable} from "../SearchTable/SearchTable.tsx";
import {useState} from "react";
import {SearchRegion} from "../SearchRegion/SearchRegion.tsx";
import Axios from "../../Axios.ts";


export const Search = () => {
    const [isClickedSearch, setIsClickedSearch] = useState(false)

    const showSearchTable = () => {
        setIsClickedSearch(true)
    }
    const hideSearchTable = () => {
        setIsClickedSearch(false)
    }

    const onChangeProductName = (e: { target: { value: string; }; }) => {
        if (e.target.value.length > 3) {
            Axios.get(`/product/searchProductStartsWith/${e.target.value}`).then(res => {
                console.log(res.data)
            })
        }
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
                       onChange={onChangeProductName}
                />
                {
                    isClickedSearch &&
                    <SearchTable/>
                }
            </div>
            <SearchRegion classForBlock={'search__block'} classForInput={'search__region'}
                          classForIcon={'search__icon'}/>
            <Button text={'Пошук'} onClick={() => {
            }} className='search__button'/>
        </div>
    )
}

