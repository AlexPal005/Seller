import './profile-menu.scss'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../App.tsx";
import {FaRegUserCircle} from "react-icons/fa";

interface profileMenuProps {
    showProfileMenu: () => void;
    hideProfileMenu: () => void;

}

export const ProfileMenu = ({showProfileMenu, hideProfileMenu}: profileMenuProps) => {

    const {logOut, User} = useContext(UserContext)
    const onClickLogOut = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        logOut()
    }
    return (
        <div className='profile-menu profile-menu_position'
             onMouseOver={showProfileMenu}
             onMouseOut={hideProfileMenu}
        >
            <div className='profile-menu__user-block'>
                <FaRegUserCircle className='profile-menu__user-photo'/>
                <p className='profile-menu__user-name'>{User.firstName ? User.firstName : User.email}</p>
            </div>
            <p className='profile-menu__category-item'>Ваш профіль</p>
            <ul className='profile-menu__list'>
                <li className='profile-menu__item'><Link to='/account/posts'
                                                         className='profile-menu__item-link'>Оголошення</Link>
                </li>
                <li className='profile-menu__item'><Link to='/account/messages'
                                                         className='profile-menu__item-link'>Повідомлення</Link>
                </li>
                <li className='profile-menu__item'><Link to='/account/settings'
                                                         className='profile-menu__item-link'>Налаштування</Link>
                </li>
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
            <a className='profile-menu__close-button' href='/' onClick={onClickLogOut}>Вийти</a>
        </div>
    )
}