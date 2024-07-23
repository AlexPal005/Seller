import './bottom-menu.scss'
import {ReactElement, useState} from "react";
import {IoHomeOutline} from "react-icons/io5";
import {BottomMenuItem} from "../BottomMenuItem/BottomMenuItem.tsx";
import {FaRegHeart, FaRegUser} from "react-icons/fa";
import {IoMdAddCircleOutline} from "react-icons/io";
import {FiMessageSquare} from "react-icons/fi";

export interface menuItemInfo {
    icon: ReactElement;
    text: string;
    link: string;
}

export const BottomMenu = () => {
    const [classForIcon] = useState<string>('bottom-menu-item__icon')
    const [menuItems] = useState<menuItemInfo[]>([
        {
            icon: <IoHomeOutline className={classForIcon}/>,
            text: 'Головна',
            link: '/'
        },
        {
            icon: <FaRegHeart className={classForIcon}/>,
            text: 'Вибране',
            //add a link when the page will be created
            link: '/'
        },
        {
            icon: <IoMdAddCircleOutline className={classForIcon}/>,
            text: 'Створити',
            link: '/create-post'
        },
        {
            icon: <FiMessageSquare className={classForIcon}/>,
            text: 'Повідомлення',
            link: '/account/messages'
        },
        {
            icon: <FaRegUser className={classForIcon}/>,
            text: 'Профіль',
            link: '/account'
        }
    ])

    return (
        <div className='bottom-menu'>
            {
                menuItems.map((menuItem, index) =>
                    <BottomMenuItem menuItemInfo={menuItem} key={index}/>
                )
            }
        </div>
    )
}