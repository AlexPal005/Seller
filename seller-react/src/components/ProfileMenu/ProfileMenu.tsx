import './profile-menu.scss'
import {Link} from "react-router-dom";

interface profileMenuProps {
    showProfileMenu: () => void;
    hideProfileMenu: () => void;

}

export const ProfileMenu = ({showProfileMenu, hideProfileMenu}: profileMenuProps) => {
    return (
        <div className='profile-menu profile-menu_position'
             onMouseOver={showProfileMenu}
             onMouseOut={hideProfileMenu}
        >
            <div className='profile-menu__user-block'>
                <img src='src/assets/detskiy-mir-36-1x.png' alt={'user'} className='profile-menu__user-photo'/>
                <p className='profile-menu__user-name'>Олександр</p>
            </div>
            <p className='profile-menu__category-item'>Ваш профіль</p>
            <ul className='profile-menu__list'>
                <li className='profile-menu__item'><Link to='/account'
                                                         className='profile-menu__item-link'>Оголошення</Link>
                </li>
                <li className='profile-menu__item'><Link to='/' className='profile-menu__item-link'>Повідомлення</Link>
                </li>
                <li className='profile-menu__item'><Link to='/' className='profile-menu__item-link'>Налаштування</Link>
                </li>
                <li className='profile-menu__item'><Link to='/' className='profile-menu__item-link'>Платежі та
                    рахунок</Link></li>
            </ul>
            <p className='profile-menu__category-item'>Обрані</p>
            <ul className='profile-menu__list'>
                <li className='profile-menu__item profile-menu__item_position'>
                    <Link to='/' className='profile-menu__item-link'>Оголошення</Link>
                    <div className='counter'>
                        <span className='counter__text'>1</span>
                    </div>
                </li>
                <li className='profile-menu__item profile-menu__item_position'>
                    <Link to='/' className='profile-menu__item-link'>Пошуки</Link>
                    <div className='counter'>
                        <span className='counter__text'>0</span>
                    </div>
                </li>
            </ul>
            <hr/>
            <a className='profile-menu__close-button' href='/'>Вийти</a>
        </div>
    )
}