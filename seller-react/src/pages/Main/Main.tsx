import './main.scss'
import {Search} from "../../components/Search/Search.tsx";
import {Categories} from "../../components/Categories/Categories.tsx";

export const Main = () => {
    return (
        <div className='main'>
            <Search/>
            <Categories/>
        </div>
    )
}