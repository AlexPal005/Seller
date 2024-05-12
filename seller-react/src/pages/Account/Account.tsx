import './account.scss'
import './ProductCard/product-card.scss'
import {AccountMainMenu} from "./AccountMainMenu/AccountMainMenu.tsx";
import {AccountSubMenu} from "./AccountSubMenu/AccountSubMenu.tsx";
import {MyPostsSearch} from "./MyPostsSearch/MyPostsSearch.tsx";
import {ProductCard} from "./ProductCard/ProductCard.tsx";
import {Route, Routes} from "react-router-dom";
import {Messages} from "./Messages/Messages.tsx";
import {Settings} from "./Settings/Settings.tsx";

const Posts = () => {
    return (
        <div className='account__main'>
            <AccountSubMenu/>
            <MyPostsSearch/>
            <hr/>
            <div className='account-product-card'>
                <input type='checkbox' className='checkbox'/>
                <p className='account-product-card-title'>Оберіть усі потрібні оголошення зі списку, щоб застосувати
                    до них однакові дії</p>
            </div>
            <ProductCard/>
            <ProductCard/>
        </div>
    )
}

export const Account = () => {

    return (
        <div className='account'>

            <div className='account__main-menu'>
                <h2>Ваші оголошення</h2>
                <AccountMainMenu/>
                <hr/>
            </div>
            <Routes>
                <Route path="/posts" element={<Posts/>}/>
                <Route path="/messages" element={<Messages/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route
                    path="*"
                    element={<Posts/>}
                />
            </Routes>
        </div>
    )
}