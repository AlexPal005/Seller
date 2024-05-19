import Axios from "../Axios.ts";
import {useState} from "react";


export type ProductStartsWith = {
    productName: string,
    categoryName: string
}

export type ProductsStartsWith = {
    productName: string,
    price: number,
    cityName: string,
    regionName: string
}
export const useProduct = () => {
    const [productsStartsWith, setProductsStartsWith]
        = useState<ProductStartsWith[]>([])

    const [productsByNameAndCity, setProductsByNameAndCity]
        = useState<ProductStartsWith[]>([])
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
                    setProductsByNameAndCity(res.data)
                }
            ).catch(err => {
            throw err
        })
    }

    return {
        searchProductStartsWith,
        productsStartsWith,
        searchProductsByNameAndCity,
        productsByNameAndCity

    }
}

