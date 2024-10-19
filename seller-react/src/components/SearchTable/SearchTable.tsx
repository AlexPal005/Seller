import './search-table.scss'
import {Product} from "../../Hooks/Product.tsx";
import {useContext} from "react";
import {MainPageContext} from "../../pages/Main/Main/Main.tsx";


interface SearchTableProps {
    products: Product[]
}

interface SearchItemProps {
    product: Product
}

export const SearchTable = ({products}: SearchTableProps) => {
    return (
        <div className='search-table'>
            <hr/>
            {
                products.map(product => {
                    return <SearchItem product={product} key={product.productId}/>
                })
            }
        </div>
    )
}

const SearchItem = ({product}: SearchItemProps) => {
    const {setSearchProductName} = useContext(MainPageContext)
    const searchClickedProduct = () => {
        setSearchProductName(product.productName)
    }
    return (
        <div className='search-item' onClick={searchClickedProduct}>
            <p className='search-item__product'>{product.productName}</p>
            <p className='search-item__category'>{product.categoryName}</p>
        </div>
    )
}