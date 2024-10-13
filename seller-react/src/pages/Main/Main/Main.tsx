import './main.scss'
import {Search} from "../../../components/Search/Search.tsx";
import {Categories} from "../../../components/Categories/Categories.tsx";
import {Social} from "../../../components/Social/Social.tsx";
import React, {createContext, useEffect, useState} from "react";
import {Product, useProduct} from "../../../Hooks/Product.tsx";
import {Route, Routes, useNavigate} from 'react-router-dom';
import {SearchPage} from "../SearchPage/SearchPage.tsx";
import {ProductPage} from "../ProductPage/ProductPage.tsx";

type MainContextType = {
    setSearchProductName: React.Dispatch<React.SetStateAction<string>>,
    search: () => void,
    setCityName: React.Dispatch<React.SetStateAction<string>>,
    setRegionName: React.Dispatch<React.SetStateAction<string>>,
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
    const navigate = useNavigate()

    const search = () => {
        console.log(productName + " " + cityName)
        if (!productName.length && (!cityName && !regionName)) {
            getAllProducts()
        } else {
            searchProductsByCriteria(productName, cityName, regionName)
        }
        navigate('/search')
    }

    useEffect(() => {
        if (!productName && !cityName && !regionName) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        console.log(cityName)
    }, [cityName])

    return (
        <MainPageContext.Provider value={{
            setSearchProductName: setProductName,
            search,
            setCityName,
            setRegionName,
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