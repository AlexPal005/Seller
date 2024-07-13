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
    const [searchProductName, setSearchProductName] = useState<string>('')
    const {
        searchProductsByNameAndCity,
        products,
        getAllProducts,
        searchProductStartsWith
    } = useProduct()
    const [cityName, setCityName] = useState('')
    const [regionName, setRegionName] = useState('')
    const navigate = useNavigate()

    const search = () => {
        if (!searchProductName.length && (!cityName && !regionName)) {
            getAllProducts()
        } else if (searchProductName.length && (!cityName && !regionName)) {
            searchProductStartsWith(searchProductName)
        } else {
            searchProductsByNameAndCity(searchProductName, cityName, regionName)
        }
        navigate('/search')
    }

    useEffect(() => {
        if (!searchProductName && !cityName && !regionName) {
            navigate('/')
        }
    }, [])

    return (
        <MainPageContext.Provider value={{
            setSearchProductName,
            search,
            setCityName,
            setRegionName,
            products,
            searchProductName
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