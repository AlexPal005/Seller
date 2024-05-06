import './account.scss'
import './ProductCard/product-card.scss'
import {AccountMainMenu} from "./AccountMainMenu/AccountMainMenu.tsx";
import {AccountSubMenu} from "./AccountSubMenu/AccountSubMenu.tsx";
import {MyPostsSearch} from "./MyPostsSearch/MyPostsSearch.tsx";
import {ProductCard} from "./ProductCard/ProductCard.tsx";

export const Account = () => {
    return (
        <div className='account'>

            <div className='account__main-menu'>
                <h2>Ваші оголошення</h2>
                <AccountMainMenu/>
            </div>

            <div className='account__main'>
                <AccountSubMenu/>
                <MyPostsSearch/>
                <hr/>
                <div className='account-product-card'>
                    <input type='checkbox' className='checkbox'/>
                    <p className='account-product-card-title'>Оберіть усі потрібні оголошення зі списку, щоб застосувати до них однакові дії</p>
                </div>
                <ProductCard/>
                <ProductCard/>
            </div>
        </div>
    )
}