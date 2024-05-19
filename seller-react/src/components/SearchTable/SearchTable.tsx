import './search-table.scss'
import {ProductStartsWith} from "../../Hooks/Product.tsx";


interface SearchTableProps {
    products: ProductStartsWith[]
}

interface SearchItemProps {
    product: ProductStartsWith
}

export const SearchTable = ({products}: SearchTableProps) => {
    return (
        <div className='search-table'>
            <hr/>
            {
                products.map(product => {
                    return <SearchItem product={product}/>
                })
            }
        </div>
    )
}

const SearchItem = ({product}: SearchItemProps) => {
    return (
        <div className='search-item'>
            <p className='search-item__product'>{product.productName}</p>
            <p className='search-item__category'>{product.categoryName}</p>
        </div>
    )
}