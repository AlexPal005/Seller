import './header-menu.scss'
import {Button} from "../Button/Button.tsx";
import {FiMessageSquare} from "react-icons/fi";
import {FaRegHeart} from "react-icons/fa";
import {RiAccountCircleLine} from "react-icons/ri";
import {IoIosArrowDown} from "react-icons/io";

export const HeaderMenu = () => {
    return (
        <div className='main-menu'>
            <ul className='main-menu__list'>
                <li className='main-menu__item'>
                    <FiMessageSquare className='main-menu__icon  main-menu__icon_margin_r'/>
                    <span>Повідомлення</span>
                </li>
                <li className='main-menu__item'>
                    <FaRegHeart className='main-menu__icon'/>
                </li>
                <li className='main-menu__item'>
                    <RiAccountCircleLine className='main-menu__icon main-menu__icon_margin_r'/>
                    <span>Мій профіль</span>
                    <IoIosArrowDown className='main-menu__icon main-menu__icon-arrow'/>
                </li>
                <li className='main-menu__item'>
                    <Button text={'Додати оголошення'}/>
                </li>
            </ul>
        </div>
    )
}