import './search-table-region.scss'

interface Region {
    Description: string;
    AreaDescription: string;

}

interface SearchTableRegion {
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

interface SearchTableItem {
    city: Region
}

const SearchTableItem = ({city}: SearchTableItem) => {
    return (
        <div style={{border: "1px solid black"}}>
            <p>{city.Description}</p>
            <p>{city.AreaDescription}</p>
        </div>
    )
}