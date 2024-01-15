import './header.scss'
import {Logo} from "../Logo/Logo.tsx";
import {HeaderMenu} from "../HeaderMenu/HeaderMenu.tsx";

export const Header = () => {
    return (
        <header className="header">
            <Logo logoSize={36}/>
            <HeaderMenu/>
        </header>
    )
}