import './search.scss'
import {Button} from "../Button/Button.tsx";
import {IoSearchOutline} from "react-icons/io5";
import {FaMapMarkerAlt} from "react-icons/fa";
import {SearchTable} from "../SearchTable/SearchTable.tsx";
import {useEffect, useState} from "react";
import {SearchTableRegion} from "../SearchTableRegion/SearchTableRegion.tsx";
import Axios from "./../../Axios.ts";

export const Search = () => {
    const [isClickedSearch, setIsClickedSearch] = useState(false)
    const [isClickedSearchRegion, setIsClickedSearchRegion] = useState(false)
    const [cities, setCities] = useState([])

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

    const onChangeRegion = (e: { target: { value: string; }; }) => {
        const stringCity = e.target.value;
        if (stringCity.length > 2) {
            Axios.post("https://api.novaposhta.ua/v2.0/json/ ", {
                apiKey: "ee86b1cf6963146d51e5ff81fa8539ae",
                modelName: "Address",
                calledMethod: "getSettlements",
                methodProperties: {
                    FindByString: `${stringCity}`
                }
            }).then(res => {
                if (res.data.data.length > 10) {
                    setCities(res.data.data.slice(0, 10))
                    return
                }
                setCities(res.data.data)
            })
        } else {
            setCities([])
        }
    }

    useEffect(() => {
        console.log(cities)
    }, [cities])

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
                       onChange={onChangeRegion}
                />
                <FaMapMarkerAlt className='search__icon'/>
                {
                    (isClickedSearchRegion && cities.length) ?
                    <SearchTableRegion cities={cities}/> : <></>
                }
            </div>
            <Button text={'Пошук'} onClick={() => {
            }} className='search__button'/>
        </div>
    )
}

