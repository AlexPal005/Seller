import './account.scss'
import './ProductCard/product-card.scss'
import {AccountMainMenu} from "./AccountMainMenu/AccountMainMenu.tsx";
import {Route, Routes} from "react-router-dom";
import {Messages} from "./Messages/Messages.tsx";
import {Settings} from "./Settings/Settings.tsx";
import {MyPosts} from "./MyPosts/MyPosts.tsx";


export const Account = () => {

    return (
        <div className='account'>

            <div className='account__main-menu'>
                <h2>Ваші оголошення</h2>
                <AccountMainMenu/>
                <hr/>
            </div>
            <Routes>
                <Route path="/posts" element={<MyPosts/>}/>
                <Route path="/messages" element={<Messages/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route
                    path="*"
                    element={<MyPosts/>}
                />
            </Routes>
        </div>
    )
}