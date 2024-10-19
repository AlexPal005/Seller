import './search-table-region.scss'
import {useContext} from "react";
import {RegionContext} from "../SearchRegion/SearchRegion.tsx";

export interface Region {
    Description: string;
    AreaDescription: string;

}

export interface SearchTableRegion {
    cities: Array<Region>
}

export const SearchTableRegion = ({cities}: SearchTableRegion) => {

    return (
        <div className='search-table'>
            {cities.length && cities.map((city, index) => {
                return <SearchTableItem city={city} key={index}/>
            })}
        </div>
    )
}

export interface SearchTableItem {
    city: Region
}

export const SearchTableItem = ({city}: SearchTableItem) => {

    const {setRegionValueFunc} = useContext(RegionContext)
    const onClickItem = () => {
        setRegionValueFunc(city)
    }

    return (
        <div className='search-table-item' onClick={onClickItem}>
            <p className='search-table-item__city'>{city.Description}</p>
            <p className='search-table-item__region'>{city.AreaDescription}</p>
        </div>
    )
}