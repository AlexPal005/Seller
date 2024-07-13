import Axios from "../Axios.ts";
import {useState} from "react";


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
    const searchProductStartsWith = (productName: string) => {
        Axios.get(`/product/searchProductStartsWith/${productName}`).then(res => {
            setProductsStartsWith(res.data)
            setProducts(res.data)
        }).catch(err => {
            throw err
        })
    }
    const searchProductsByNameAndCity = (productName: string, cityName: string, regionName: string) => {
        Axios.get(`/product/searchProductsStartWithAndCityName/${productName}/${cityName}/${regionName}`)
            .then(
                res => {
                    setProducts(res.data)
                }
            )
            .catch(
                err => {
                    throw err
                }
            )
    }

    const getAllProducts = () => {
        Axios.get('/product/getAll').then(res => {
            setProducts(res.data)
        }).catch(err => {
            throw err
        })
    }

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
        searchProductStartsWith,
        productsStartsWith,
        searchProductsByNameAndCity,
        products,
        getAllProducts,
        getProductsByUserId,
        getProductById,
        getImagesByProductId,
        images,

    }
}

