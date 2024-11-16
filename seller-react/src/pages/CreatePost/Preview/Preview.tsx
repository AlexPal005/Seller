import './../../Main/ProductPage/product-page.scss'
import {Product} from "../../../Hooks/Product.tsx";
import {ProductPageImages} from "../../Main/ProductPageImages/ProductPageImages.tsx";
import {ProductPageInfo} from "../../Main/ProductPageInfo/ProductPageInfo.tsx";
import {ProductPageDescription} from "../../Main/ProductPageDescription/ProductPageDescription.tsx";
import {useContext} from "react";
import {PostContext} from "../CreatePost/CreatePost.tsx";


interface PreviewProps {
    product: Product;
}

export const Preview = ({product}: PreviewProps) => {
    const {productToCreate} = useContext(PostContext)

    return (
        <div className='product-page'>
            <ProductPageImages images={productToCreate.images}/>
            <ProductPageInfo product={product}/>
            <ProductPageDescription product={product}/>
        </div>
    )
}