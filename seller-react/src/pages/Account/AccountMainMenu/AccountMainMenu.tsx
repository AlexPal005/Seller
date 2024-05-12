import {NavLink} from 'react-router-dom'
import './account-main-menu.scss'

export const AccountMainMenu = () => {
    return (
        <div className='account-main-menu'>
            <ul className='account__main-menu__list'>
                <li className='account-main-menu__list-item'>
                    <NavLink to='/account/posts' className='account-main-menu__link'>Оголошення</NavLink>
                </li>
                <li className='account-main-menu__list-item'>
                    <NavLink to='/account/messages' className='account-main-menu__link'>Повідомлення</NavLink>
                </li>
                <li className='account-main-menu__list-item'>
                    <NavLink to='/account/settings' className='account-main-menu__link'>Налаштування</NavLink>
                </li>
            </ul>
        </div>
    )
}