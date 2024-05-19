import './main.scss'
import {Search} from "../../../components/Search/Search.tsx";
import {Categories} from "../../../components/Categories/Categories.tsx";
import {Social} from "../../../components/Social/Social.tsx";
import React, {createContext, useEffect, useState} from "react";
import {useProduct} from "../../../Hooks/Product.tsx";
import {Route, Routes, useNavigate} from 'react-router-dom';
import {SearchPage} from "../SearchPage/SearchPage.tsx";

type MainContextType = {
    setSearchProductName: React.Dispatch<React.SetStateAction<string>>,
    search: (e: { preventDefault: () => void }) => void,
    setCityName: React.Dispatch<React.SetStateAction<string>>,
    setRegionName: React.Dispatch<React.SetStateAction<string>>,
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
}
export const MainPageContext = createContext<MainContextType>(defaultMainContext)

export const Main = () => {
    const [searchProductName, setSearchProductName] = useState<string>('')
    const {searchProductsByNameAndCity, productsByNameAndCity} = useProduct()
    const [cityName, setCityName] = useState('')
    const [regionName, setRegionName] = useState('')
    const navigate = useNavigate()
    const search = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        searchProductsByNameAndCity(searchProductName, cityName, regionName)
        navigate('/search')

    }

    useEffect(() => {
        console.log(productsByNameAndCity)
    }, [productsByNameAndCity])

    return (
        <MainPageContext.Provider value={{
            setSearchProductName,
            search,
            setCityName,
            setRegionName

        }}>
            <div className='main'>
                <Search/>
                <Routes>
                    <Route path='/search' element={<SearchPage/>}/>
                    <Route path='/' element={
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