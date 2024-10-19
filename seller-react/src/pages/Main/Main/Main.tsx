import './main.scss'
import {Search} from "../../../components/Search/Search.tsx";
import {Categories} from "../../../components/Categories/Categories.tsx";
import {Social} from "../../../components/Social/Social.tsx";
import React, {createContext, useCallback, useEffect, useState} from "react";
import {Product, useProduct} from "../../../Hooks/Product.tsx";
import {Route, Routes, useNavigate} from 'react-router-dom';
import {SearchPage} from "../SearchPage/SearchPage.tsx";
import {ProductPage} from "../ProductPage/ProductPage.tsx";

type MainContextType = {
    setSearchProductName: React.Dispatch<React.SetStateAction<string>>,
    search: () => void,
    setCityName: React.Dispatch<React.SetStateAction<string>>,
    setRegionName: React.Dispatch<React.SetStateAction<string>>,
    setCategory: React.Dispatch<React.SetStateAction<string>>,
    setPriceFrom: React.Dispatch<React.SetStateAction<number>>,
    setPriceTo: React.Dispatch<React.SetStateAction<number>>,
    products: Product[],
    searchProductName: string
}
const defaultMainContext = {
    setSearchProductName: () => {
    },
    search: () => {
    },
    setCityName: () => {

    },
    setRegionName: () => {

    },
    setCategory: () => {

    },
    setPriceFrom: () => {

    },
    setPriceTo: () => {

    },
    products: [],
    searchProductName: ''
}
export const MainPageContext = createContext<MainContextType>(defaultMainContext)

export const Main = () => {
    const [productName, setProductName] = useState<string>('')
    const {
        searchProductsByCriteria,
        products,
        getAllProducts,
    } = useProduct()
    const [cityName, setCityName] = useState('')
    const [regionName, setRegionName] = useState('')
    const [category, setCategory] = useState('')
    const [priceFrom, setPriceFrom] = useState<number>(-1)
    const [priceTo, setPriceTo] = useState<number>(-1)
    const navigate = useNavigate()

    const search = useCallback(() => {
        if (!productName.length && (!cityName && !regionName) && !category && priceFrom === -1 && priceTo === -1) {
            getAllProducts()
        } else {
            searchProductsByCriteria(productName, cityName, regionName, category, priceFrom, priceTo)
        }
        navigate('/search')

    }, [category, cityName, getAllProducts, navigate, priceFrom, priceTo, productName, regionName, searchProductsByCriteria])


    useEffect(() => {
        if (!productName && !cityName && !regionName) {
            navigate('/')
        }
    }, [cityName, navigate, productName, regionName])

    useEffect(() => {
        if (priceFrom !== -1 || priceTo !== -1) {
            search()
        }
    }, [priceFrom, priceTo, search])

    useEffect(() => {
        search()
    }, [productName]);

    useEffect(() => {
        console.log(products)
    }, [products])

    return (
        <MainPageContext.Provider value={{
            setSearchProductName: setProductName,
            search,
            setCityName,
            setRegionName,
            setCategory,
            setPriceFrom,
            setPriceTo,
            products,
            searchProductName: productName
        }}>
            <div className='main'>
                <Search/>
                <Routes>
                    <Route path='/search' element={<SearchPage/>}/>
                    <Route path="/post/:productId" element={<ProductPage/>}/>
                    <Route path='/*' element={
                        <>
                            <Categories/>
                            <Social/>
                        </>
                    }/>
                </Routes>
            </div>
        </MainPageContext.Provider>
    )
}