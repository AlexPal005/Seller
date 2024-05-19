import Axios from "../Axios.ts";
import {useState} from "react";


export type ProductStartsWith = {
    productName: string,
    categoryName: string
}

export type ProductMainType = {
    productId: number,
    productName: string,
    price: number,
    cityName: string,
    regionName: string,
    mainImage?: string,
    createdAt: string,
    categoryName?: string
}
export const useProduct = () => {
    const [productsStartsWith, setProductsStartsWith]
        = useState<ProductStartsWith[]>([])

    const [products, setProducts]
        = useState<ProductMainType[]>([])
    const searchProductStartsWith = (name: string) => {
        Axios.get(`/product/searchProductStartsWith/${name}`).then(res => {
            setProductsStartsWith(res.data)
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
            ).catch(err => {
            throw err
        })
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


    return {
        searchProductStartsWith,
        productsStartsWith,
        searchProductsByNameAndCity,
        products,
        getAllProducts,
        getProductsByUserId

    }
}

