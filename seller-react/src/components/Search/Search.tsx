import './search.scss'
import {Button} from "../Button/Button.tsx";
import {IoSearchOutline} from "react-icons/io5";
import {SearchTable} from "../SearchTable/SearchTable.tsx";
import {useContext, useState} from "react";
import {SearchRegion} from "../SearchRegion/SearchRegion.tsx";
import {useProduct} from "../../Hooks/Product.tsx";
import {MainPageContext} from "../../pages/Main/Main/Main.tsx";
import {useNavigate} from "react-router-dom";


export const Search = () => {
    const [isClickedSearch, setIsClickedSearch] = useState(false)
    const {searchProductName, setSearchProductName} = useContext(MainPageContext)
    const navigate = useNavigate()
    const {
        searchProductsByCriteria,
        productsStartsWith,
    } = useProduct()

    const showSearchTable = () => {
        setIsClickedSearch(true)
    }

    const hideSearchTable = () => {
        setIsClickedSearch(false)
    }

    const onChangeProductName = (e: { target: { value: string; }; }) => {
        if (e.target.value.length > 3) {
            searchProductsByCriteria(e.target.value)
        }
        setSearchProductName(e.target.value)
    }

    const onClickSearch = () => {
        navigate('/search')
    }

    return (
        <div className='search'>
            <div className="search__block">
                <IoSearchOutline className='search__icon'/>
                <input type='text'
                       className='search__text'
                       placeholder='Що шукаєте?'
                       onFocus={showSearchTable}
                       onBlur={() => setTimeout(hideSearchTable, 200)}
                       onChange={onChangeProductName}
                       value={searchProductName}
                />
                {
                    isClickedSearch &&
                    <SearchTable products={productsStartsWith}/>
                }
            </div>
            <SearchRegion classForBlock={'search__block search__block-region'} classForInput={'search__region'}
                          classForIcon={'search__icon'}/>
            <Button text={'Пошук'} onClick={onClickSearch} className='search__button'/>
        </div>
    )
}

