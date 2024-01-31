import './social.scss'
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";

export const Social = () => {
    return (
        <div className='social-main'>
            <h1 className='social-main__title'>Seller</h1>
            <p className='social-main__text'>
                Усі онлайн-оголошення України на Seller - тут ви знайдете те, що шукали! Натиснувши на кнопку Подати
                оголошення, ви зможете розмістити оголошення на будь-яку тематику легко й швидко.
                За допомогою сервісу Seller ви зможете купити чи продати з рук у руки практично все, що завгодно.
            </p>
            <span className='social-main__social-title'>Ми в соціальних мережах</span>
            <div className='social-networks'>
                <a href='#' className='social-networks__link'><FaInstagram className='social-networks__icon'/></a>
                <a href='#' className='social-networks__link'><FaYoutube className='social-networks__icon'/></a>
                <a href='#' className='social-networks__link'><FaTwitter className='social-networks__icon'/></a>
                <a href='#' className='social-networks__link'><FaFacebook className='social-networks__icon'/></a>
            </div>
        </div>
    )
}