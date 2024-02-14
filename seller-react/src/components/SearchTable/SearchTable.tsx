import './search-table.scss'

export const SearchTable = () => {
    return (
        <div className='search-table'>
            <p className='search-table__title'>Нещодавний пошук</p>
            <hr/>
            <SearchItem/>
            <SearchItem/>
        </div>
    )
}

const SearchItem = () => {
    return (
        <div className='search-item'>
            <p className='search-item__text'>Автомобільна фарба</p>
            <span className='search-item__filters-text'>Пошукові фільтри [<span>4</span>]</span>
        </div>
    )
}