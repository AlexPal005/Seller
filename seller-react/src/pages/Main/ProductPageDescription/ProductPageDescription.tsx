import './product-page-descriprion.scss'
import {Product} from "../../../Hooks/Product.tsx";

type ProductPageDescriptionProps = {
    product: Product
}
export const ProductPageDescription = ({product} : ProductPageDescriptionProps) => {
    return(
        <div className='product-page-description white-block'>
            <h2>Опис</h2>
            <p className='product-page-info__description'>{product?.description}</p>
        </div>
    )
}