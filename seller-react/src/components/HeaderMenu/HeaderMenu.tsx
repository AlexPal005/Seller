import './header-menu.scss'
import {Button} from "../Button/Button.tsx";
import {FiMessageSquare} from "react-icons/fi";
import {FaRegHeart} from "react-icons/fa";
import {RiAccountCircleLine} from "react-icons/ri";
import {IoIosArrowDown} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {ProfileMenu} from "../ProfileMenu/ProfileMenu.tsx";
import {useState} from "react";

export const HeaderMenu = () => {
    const navigate = useNavigate();
    const [isHoverProfile, setIsHoverProfile] = useState(false)
    const redirectCreatePost = (): void => {
        navigate('/create-post');
    }
    const showProfileMenu = () => {
        setIsHoverProfile(true)
    }
    const hideProfileMenu = () => {
        setIsHoverProfile(false)
    }

    return (
        <div className='main-menu'>
            <ul className='main-menu__list'>
                <li className='main-menu__item main-menu__item_color'>
                    <FiMessageSquare className='main-menu__icon  main-menu__icon_margin-r'/>
                    <span>Повідомлення</span>
                </li>
                <li className='main-menu__item main-menu__item_color'>
                    <FaRegHeart className='main-menu__icon'/>
                </li>
                <li className='main-menu__item '
                    onMouseOver={showProfileMenu}
                >
                    <div className='main-menu__profile main-menu__item_color'>
                        <RiAccountCircleLine className='main-menu__icon main-menu__icon_margin-r'/>
                        <span>Мій профіль</span>
                        <IoIosArrowDown className='main-menu__icon main-menu__icon-arrow'/>
                    </div>

                    {
                        isHoverProfile &&
                        <ProfileMenu
                            showProfileMenu={showProfileMenu}
                            hideProfileMenu={hideProfileMenu}
                        />
                    }
                </li>
                <li className='main-menu__item main-menu__item-hover'>
                    <Button text={'Додати оголошення'} onClick={redirectCreatePost} className='main-menu__button'/>
                </li>
            </ul>
        </div>
    )
}