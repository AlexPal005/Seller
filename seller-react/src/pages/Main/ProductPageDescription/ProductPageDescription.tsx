import './product-page-descriprion.scss'
import {ProductMainType} from "../../../Hooks/Product.tsx";

type ProductPageDescriptionProps = {
    product: ProductMainType
}
export const ProductPageDescription = ({product} : ProductPageDescriptionProps) => {
    return(
        <div className='product-page-description white-block'>
            <h2>Опис</h2>
            <p className='product-page-info__description'>{product?.description}</p>
        </div>
    )
}