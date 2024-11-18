import {NavLink, useLocation} from 'react-router-dom'
import './account-main-menu.scss'

export const AccountMainMenu = () => {
    const location = useLocation()
    return (
        <div className='account-main-menu'>
            <ul className='account__main-menu__list'>
                <li className='account-main-menu__list-item'>
                    <NavLink to='/account/posts/active'
                             className={({isActive}) =>
                                 isActive || location.pathname.startsWith('/account/posts')
                                     ? 'account-main-menu__link active'
                                     : 'account-main-menu__link'
                             } end
                    >
                        Оголошення
                    </NavLink>
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