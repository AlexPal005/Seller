import {Link} from 'react-router-dom'
import './account-main-menu.scss'

export const AccountMainMenu = () => {
    return (
        <div className='account-main-menu'>
            <ul className='account__main-menu__list'>
                <li className='account-main-menu__list-item'>
                    <Link to='/' className='account-main-menu__link'>Оголошення</Link>
                </li>
                <li className='account-main-menu__list-item'>
                    <Link to='/' className='account-main-menu__link'>Повідомлення</Link>
                </li>
                <li className='account-main-menu__list-item'>
                    <Link to='/' className='account-main-menu__link'>Налаштування</Link>
                </li>
            </ul>
        </div>
    )
}