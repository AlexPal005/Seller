import Axios from "../Axios.ts";
import {useCallback, useState} from "react";


export type Product = {
    name: string,
    productId: number,
    productName: string,
    price: number,
    cityName: string,
    regionName: string,
    mainImage?: string,
    createdAt: string,
    categoryName?: string,
    description: string
}

export type ProductImage = {
    image: string
}
export const useProduct = () => {
    const [productsStartsWith, setProductsStartsWith]
        = useState<Product[]>([])

    const [products, setProducts]
        = useState<Product[]>([])

    const [images, setImages] = useState<ProductImage[]>([])


    const searchProductsByCriteria = useCallback((productName: string,
                                                  cityName?: string,
                                                  regionName?: string,
                                                  category?: string,
                                                  priceFrom?: number,
                                                  priceTo?: number) => {

            Axios.get(`/product/searchProductsByCriteria`, {
                params: {
                    productName: productName || null,
                    cityName: cityName || null,
                    regionName: regionName || null,
                    category: category || null,
                    priceFrom: priceFrom === -1 ? null : priceFrom,
                    priceTo: priceTo === -1 ? null : priceTo,
                }
            })
                .then(res => {
                    setProductsStartsWith(res.data)
                    setProducts(res.data)
                }).catch(err => {
                throw err
            })

        }, []
    )

    const getAllProducts = useCallback(() => {
        Axios.get('/product/getAll').then(res => {
            setProducts(res.data)
        }).catch(err => {
            throw err
        })
    }, [])

    const getProductsByUserId = (userId: number) => {
        Axios.get(`/product/getProductsByUserId/${userId}`).then(res => {
            setProducts(res.data)
        }).catch(err => {
            throw err
        })
    }

    const getProductById = (productId: number) => {
        Axios.get(`/product/getProductById/${productId}`).then(res => {
            setProducts(res.data)
        }).catch(err => {
            throw err
        })
    }

    const getImagesByProductId = (productId: number) => {
        Axios.get(`/product/getImagesByProductId/${productId}`).then(res => {
            setImages(res.data)
        }).catch(err => {
            throw err
        })
    }


    return {
        searchProductsByCriteria,
        productsStartsWith,
        products,
        getAllProducts,
        getProductsByUserId,
        getProductById,
        getImagesByProductId,
        images,

    }
}

