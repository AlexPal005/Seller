import {AccountSubMenu} from "../AccountSubMenu/AccountSubMenu.tsx";
import {MyPostsSearch} from "../MyPostsSearch/MyPostsSearch.tsx";
import {ProductCard} from "../ProductCard/ProductCard.tsx";
import {useContext, useEffect} from "react";
import {Status, useProduct} from "../../../Hooks/Product.tsx";
import {useLocation} from "react-router-dom";
import {UserContext} from "../../../App.tsx";


export const MyPosts = () => {
    const {productsByUserId: products, getProductsByUserId} = useProduct()
    const location = useLocation();
    const {User} = useContext(UserContext)

    useEffect(() => {
        if (User) {
            if (location.pathname === '/account/posts/active') {
                getProductsByUserId(User.userId, Status.ACTIVE)
            } else if (location.pathname === '/account/posts/inactive') {
                getProductsByUserId(User.userId, Status.INACTIVE)
            } else if (location.pathname === '/account/posts/pending') {
                getProductsByUserId(User.userId, Status.PENDING)
            } else if (location.pathname === '/account/posts/rejected') {
                getProductsByUserId(User.userId, Status.REJECTED)
            }
        }
    }, [location.pathname, getProductsByUserId])

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
            {
                products.map(product => {
                    return (
                        <ProductCard key={product.productId} product={product}/>
                    )
                })
            }
        </div>
    )
}
