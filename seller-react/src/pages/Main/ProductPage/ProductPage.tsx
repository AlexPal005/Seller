import './product-page.scss'
import {useParams} from "react-router-dom";
import {useProduct} from "../../../Hooks/Product.tsx";
import {useEffect, useState} from "react";
import {ProductPageImages} from "../ProductPageImages/ProductPageImages.tsx";
import {ProductPageDescription} from "../ProductPageDescription/ProductPageDescription.tsx";
import {ProductPageInfo} from "../ProductPageInfo/ProductPageInfo.tsx";

export const ProductPage = () => {
    const {productId} = useParams()
    const {getProductById, products, getImagesByProductId, images} = useProduct()
    const [product, setProduct] = useState({
        name: '',
        productId: -1,
        productName: '',
        price: -1,
        cityName: '',
        regionName: '',
        createdAt: '',
        description: ''
    })
    useEffect(() => {
        if (productId !== undefined) {
            const id = parseInt(productId, 10)
            if (!isNaN(id)) {
                getProductById(id)
                getImagesByProductId(id)
            }
        }
    }, [productId])

    useEffect(() => {
        setProduct(products[0])
    }, [products])

    // useEffect(() => {
    //     if (productId !== undefined) {
    //         const id = parseInt(productId, 10)
    //         if (!isNaN(id)) {
    //             getImagesByProductId(id)
    //         }
    //     }
    // }, [productId])

    return (
        <div className='product-page'>
            <ProductPageImages images={images.map(image => image.image)}/>
            <ProductPageInfo product={product}/>
            <ProductPageDescription product={product}/>
            <div></div>
        </div>
    )
}