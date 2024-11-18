import './main.scss'
import {Search} from "../../../components/Search/Search.tsx";
import {Categories} from "../../../components/Categories/Categories.tsx";
import {Social} from "../../../components/Social/Social.tsx";
import React, {createContext, useCallback, useEffect, useState} from "react";
import {Product, useProduct} from "../../../Hooks/Product.tsx";
import {Route, Routes, useLocation} from 'react-router-dom';
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
    searchProductName: string,
    isLoadingProducts: boolean,
    setIsCategorySet: React.Dispatch<React.SetStateAction<boolean>>,
    isCategorySet: boolean,
    currPage: number,
    setCurrPage: React.Dispatch<React.SetStateAction<number>>,
    countProductsOnPage: number,
    countProducts: number
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
    searchProductName: '',
    isLoadingProducts: false,
    setIsCategorySet: () => {
    },
    isCategorySet: false,
    currPage: 1,
    setCurrPage: () => {
    },
    countProductsOnPage: 5,
    countProducts: 0
}
export const MainPageContext = createContext<MainContextType>(defaultMainContext)

export const Main = () => {
    const [productName, setProductName] = useState<string>('')
    const {
        searchProductsByCriteria,
        products,
        isLoadingProducts,
        countProducts,
        getCountOfProducts
    } = useProduct()
    const [cityName, setCityName] = useState('')
    const [regionName, setRegionName] = useState('')
    const [category, setCategory] = useState('')
    const [priceFrom, setPriceFrom] = useState<number>(-1)
    const [priceTo, setPriceTo] = useState<number>(-1)
    const location = useLocation()
    const [isCategorySet, setIsCategorySet] = useState(false)
    const [currPage, setCurrPage] = useState(1)
    const [countProductsOnPage] = useState(10)

    const search = useCallback(() => {
        if (isCategorySet) {
            if (!productName.length && (!cityName && !regionName) && !category && priceFrom === -1 && priceTo === -1) {
                const criteria = {pageNumber: currPage, countProductsOnPage: countProductsOnPage}
                searchProductsByCriteria(criteria)
                getCountOfProducts(criteria)
            } else {
                const criteria = {
                    productName: productName,
                    cityName: cityName,
                    regionName: regionName,
                    category: category,
                    priceFrom: priceFrom,
                    priceTo: priceTo,
                    pageNumber: currPage,
                    countProductsOnPage: countProductsOnPage
                }
                getCountOfProducts(criteria)
                searchProductsByCriteria(criteria)
            }
        }
    }, [
        isCategorySet,
        category,
        cityName,
        priceFrom,
        priceTo,
        productName,
        regionName,
        searchProductsByCriteria,
        currPage,
        countProductsOnPage
    ])

    useEffect(() => {
        if (productName || priceFrom !== -1 || priceTo !== -1) {
            search()
        }
    }, [productName, priceFrom, priceTo, search])

    useEffect(() => {
        search()
    }, [currPage, category])


    useEffect(() => {
        if (!location.pathname.startsWith('/search')) {
            setCategory('')
            setIsCategorySet(false)
        }
    }, [location.pathname])

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
            searchProductName: productName,
            isLoadingProducts,
            setIsCategorySet,
            isCategorySet,
            currPage,
            setCurrPage,
            countProductsOnPage,
            countProducts
        }}>
            <div className='main'>
                <Search/>
                <Routes>
                    <Route path='/search/:category?' element={<SearchPage/>}/>
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