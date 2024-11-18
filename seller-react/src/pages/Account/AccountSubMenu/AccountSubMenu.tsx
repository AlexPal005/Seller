import './account-sub-menu.scss'
import {NavLink} from "react-router-dom";

export const AccountSubMenu = () => {
    return (
        <div className='account-sub-menu'>
            <ul className='account__main-menu__list'>
                <li className='account-main-menu__list-item'>
                    <NavLink to='/account/posts/active' className='account-main-menu__link'>Активні</NavLink>
                </li>
                <li className='account-main-menu__list-item'>
                    <NavLink to='/account/posts/pending' className='account-main-menu__link'>Очікуючі</NavLink>
                </li>
                <li className='account-main-menu__list-item'>
                    <NavLink to='/account/posts/inactive' className='account-main-menu__link'>Неактивні</NavLink>
                </li>
                <li className='account-main-menu__list-item'>
                    <NavLink to='/account/posts/rejected' className='account-main-menu__link'>Відхилені</NavLink>
                </li>
            </ul>
            <hr/>
        </div>
    )
}