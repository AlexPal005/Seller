import {useContext} from "react";
import {MainPageContext} from "../Main/Main.tsx";
import {ProductMainType} from "../../../Hooks/Product.tsx";
import './search-page-products.scss'

export const SearchPageProducts = () => {
    const {products} = useContext(MainPageContext)
    return (
        <div className='search-page-products'>
            <h2 className='search-product-card__count'>Знайдено {`${products.length}`} оголошень</h2>
            {products.map(product => {
                return (
                    <SearchProductCard product={product} key={product.productId}/>
                )
            })}
        </div>
    )
}

interface SearchProductCardProps {
    product: ProductMainType
}

const SearchProductCard = ({product}: SearchProductCardProps) => {
    return (
        <div className='search-product-card'>
            <img alt={product.productName}
                 src={`data:image/jpeg;base64,${product.mainImage}`}
                 className='search-product-card__image'
            />
            <div className='search-product-card__info-block'>
                <h2>{product.productName}</h2>
                <p className='search-product-card__price'>{product.price} грн</p>
                <p>{product.cityName} - {new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    )
}