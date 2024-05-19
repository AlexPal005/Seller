import {FaMapMarkerAlt} from "react-icons/fa";
import {Region, SearchTableRegion} from "../SearchTableRegion/SearchTableRegion.tsx";
import {createContext, useContext, useState} from "react";
import {PostContext} from "../../pages/CreatePost/CreatePost.tsx";
import axios from "axios";
import {MainPageContext} from "../../pages/Main/Main/Main.tsx";

const defaultRegionContext = {
    setRegionValueFunc: (city: Region) => {
        console.log(city)
    },
}

type SearchRegionProps = {
    classForBlock?: string,
    classForInput?: string,
    classForIcon?: string
};

export const RegionContext = createContext(defaultRegionContext)
export const SearchRegion = ({classForBlock, classForInput, classForIcon}: SearchRegionProps) => {

    const [regionInputValue, setRegionInputValue] = useState('');
    const [cities, setCities] = useState([])
    const [isClickedSearchRegion, setIsClickedSearchRegion] = useState(false)
    const {setCity, setRegion} = useContext(PostContext)
    const {setCityName, setRegionName} = useContext(MainPageContext)

    const setRegionValueFunc = (city: Region) => {
        setRegionInputValue(city.Description + ', ' + city.AreaDescription)
        setCity(city.Description)
        setRegion(city.AreaDescription)
        setCityName(city.Description)
        setRegionName(city.AreaDescription)
        setIsClickedSearchRegion(false);
    }

    const showSearchTableRegion = () => {
        setIsClickedSearchRegion(true)
    }
    const hideSearchTableRegion = () => {
        setIsClickedSearchRegion(false)
    }
    const onChangeRegion = (e: { target: { value: string; }; }) => {
        const stringCity = e.target.value;
        setRegionInputValue(stringCity)
        if (stringCity.length > 2) {
            axios.post("https://api.novaposhta.ua/v2.0/json/ ", {
                apiKey: "ee86b1cf6963146d51e5ff81fa8539ae",
                modelName: "Address",
                calledMethod: "getSettlements",
                methodProperties: {
                    FindByString: `${stringCity}`
                }
            }).then(res => {
                setCities(res.data.data)
            })
        } else {
            setCities([])
        }

    }
    return (
        <RegionContext.Provider value={{
            setRegionValueFunc
        }}>
            <div className={classForBlock}>
                <input type='text'
                       className={classForInput}
                       placeholder='Уся Україна'
                       onFocus={showSearchTableRegion}
                       onBlur={() => setTimeout(hideSearchTableRegion, 200)}
                       onChange={onChangeRegion}
                       value={regionInputValue}
                />
                <FaMapMarkerAlt className={classForIcon}/>
                {
                    (isClickedSearchRegion && cities.length) ?
                        <SearchTableRegion cities={cities}/> : <></>
                }
            </div>
        </RegionContext.Provider>
    )
}