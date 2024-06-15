import './bottom-menu-item.scss'
import {menuItemInfo} from "../BottomMenu/BottomMenu.tsx";
import {Link} from "react-router-dom";


interface BottomMenuItemProps {
    menuItemInfo: menuItemInfo;
}

export const BottomMenuItem = ({menuItemInfo}: BottomMenuItemProps) => {
    return (
        <Link to={menuItemInfo.link} className='bottom-menu-item'>
            {menuItemInfo.icon}
            <span className='bottom-menu-item__text'>{menuItemInfo.text}</span>
        </Link>
    )
}