import './account-sub-menu.scss'
import {Link} from "react-router-dom";

export const AccountSubMenu = () => {
    return (
        <div className='account-sub-menu'>
            <ul className='account__main-menu__list'>
                <li className='account-main-menu__list-item'>
                    <Link to='/' className='account-main-menu__link'>Активні</Link>
                </li>
                <li className='account-main-menu__list-item'>
                    <Link to='/' className='account-main-menu__link'>Очікуючі</Link>
                </li>
                <li className='account-main-menu__list-item'>
                    <Link to='/' className='account-main-menu__link'>Неоплачені</Link>
                </li>
                <li className='account-main-menu__list-item'>
                    <Link to='/' className='account-main-menu__link'>Неактивні</Link>
                </li>
                <li className='account-main-menu__list-item'>
                    <Link to='/' className='account-main-menu__link'>Відхилені</Link>
                </li>
            </ul>
            <hr/>
        </div>
    )
}