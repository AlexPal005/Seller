import './product-page-info.scss'
import {Product} from "../../../Hooks/Product.tsx";
import {format} from "date-fns";
import {uk} from "date-fns/locale";
import {FaLocationDot} from "react-icons/fa6";
import {useUser} from "../../../Hooks/User.tsx";
import {useEffect, useState} from "react";
import {MiniChat} from "../MiniChat/MiniChat.tsx";


type ProductPageInfoProps = {
    product: Product
}
export const ProductPageInfo = ({product}: ProductPageInfoProps) => {

    const {user, getUserByProductId} = useUser()
    const [isChatOpen, setIsChatOpen] = useState(false);
    useEffect(() => {
        if (product?.productId) {
            getUserByProductId(product.productId)
        }
    }, [product?.productId]);

    useEffect(() => {
        console.log(user)
    }, [user]);


    return (
        <div className='product-page-info white-block'>
            <p className='product-page-info__date'>
                Опубліковано&nbsp;
                {
                    product?.createdAt &&
                    format(new Date(product?.createdAt), 'd MMMM yyyy \'р.\'', {locale: uk})
                }
            </p>
            <p className='product-page-info__product-name'>{product?.productName}</p>
            <p className='product-page-info__price'>{product?.price} грн</p>

            <div className='product-page-info__block'>
                <h3 className='product-page-info__title'>Місцезнаходження</h3><br/>
                <div className='product-page-info__region-text-block'>
                    <FaLocationDot className='product-page-info__region-icon'/>
                    <p className='product-page-info__region'>{product?.cityName}, {product?.regionName}</p>
                </div>
            </div>

            <div className='product-page-info__block'>
                <h3 className='product-page-info__title'>Користувач</h3><br/>
                <p className='product-page-info__username'>{user?.firstName}</p>
                <p>{user?.email}</p>
            </div>
            <button className='product-page-info__write-message'
                    onClick={() => setIsChatOpen(true)}
            >Написати повідомлення
            </button>
            {isChatOpen && <MiniChat user={user} onClose={() => setIsChatOpen(false)} product={product}/>}
        </div>
    )

}