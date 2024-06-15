import './search.scss'
import {Button} from "../Button/Button.tsx";
import {IoSearchOutline} from "react-icons/io5";
import {SearchTable} from "../SearchTable/SearchTable.tsx";
import {useContext, useEffect, useState} from "react";
import {SearchRegion} from "../SearchRegion/SearchRegion.tsx";
import {useProduct} from "../../Hooks/Product.tsx";
import {MainPageContext} from "../../pages/Main/Main/Main.tsx";


export const Search = () => {
    const [isClickedSearch, setIsClickedSearch] = useState(false)
    const {setSearchProductName, search} = useContext(MainPageContext)

    const {
        searchProductStartsWith,
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
            searchProductStartsWith(e.target.value)
        }
        setSearchProductName(e.target.value)
    }

    useEffect(() => {
        console.log(productsStartsWith)
    }, [productsStartsWith]);


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
                />
                {
                    isClickedSearch &&
                    <SearchTable products={productsStartsWith}/>
                }
            </div>
            <SearchRegion classForBlock={'search__block search__block-region'} classForInput={'search__region'}
                          classForIcon={'search__icon'}/>
            <Button text={'Пошук'} onClick={search} className='search__button'/>
        </div>
    )
}

