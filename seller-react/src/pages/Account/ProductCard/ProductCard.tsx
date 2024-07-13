import './product-card.scss'
import {Product} from "../../../Hooks/Product.tsx";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({product}: ProductCardProps) => {
    return (
        <div className='account-product-card'>
            <input type='checkbox' className='checkbox'/>
            <div className='account-product-card__info'>
                <div className='account-product-card__content'>
                    <img alt='Фото' src={`data:image/jpeg;base64,${product.mainImage}`}
                         className='account-product-card__image'/>
                    <div className='account-product-card__text'>
                        <h3>{product.productName}</h3>
                        <p>
                            {product.categoryName}
                        </p>
                        <p>
                            {product.cityName}, {product.regionName}
                        </p>
                        <p>
                            {new Date(product.createdAt).toLocaleDateString()}
                        </p>
                        <h3 className='account-product-card__price'>{product.price} грн</h3>
                        <hr/>
                    </div>
                </div>
                <div className='account-product-card__buttons'>
                    <button className='button account-product-card__button-edit'>Редагувати</button>
                    <button className='button account-product-card__button-delete'>Деактивувати</button>
                </div>
            </div>
        </div>
    )
}