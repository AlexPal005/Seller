import {useContext, useEffect} from "react";
import {MainPageContext} from "../Main/Main.tsx";
import {Product} from "../../../Hooks/Product.tsx";
import './search-page-products.scss'
import {Link} from "react-router-dom";

export const SearchPageProducts = () => {
    const {products, search} = useContext(MainPageContext)

    useEffect(() => {
        search()
    }, [])

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
    product: Product
}

const SearchProductCard = ({product}: SearchProductCardProps) => {

    return (
        <Link to={`/post/${product.productId}`} className='search-product-card'>
            <img alt={product.productName}
                 src={`data:image/jpeg;base64,${product.mainImage}`}
                 className='search-product-card__image'
            />
            <div className='search-product-card__info-block'>
                <p className='search-product-card__product-name'>{product.productName}</p>
                <p className='search-product-card__price'>{product.price} грн</p>
                <p>{product.cityName} - {new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
        </Link>
    )
}