import {AccountSubMenu} from "../AccountSubMenu/AccountSubMenu.tsx";
import {MyPostsSearch} from "../MyPostsSearch/MyPostsSearch.tsx";
import {ProductCard} from "../ProductCard/ProductCard.tsx";
import {useEffect} from "react";
import {useProduct} from "../../../Hooks/Product.tsx";


export const MyPosts = () => {
    const {productsByUserId: products, getProductsByUserId} = useProduct()
    useEffect(() => {
        getProductsByUserId(1)
    }, []);
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
