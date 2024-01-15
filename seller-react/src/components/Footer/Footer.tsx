import {Link} from "react-router-dom"
import './footer.scss'

export const Footer = () => {
    return (
        <footer className='footer'>
            <ul className="footer__list-menu">
                <li className="footer__list-menu-item">
                    <Link to='/' className="footer__list-link">Умови користування</Link>
                </li>
                <li className="footer__list-menu-item">
                    <Link to='/' className="footer__list-link">Політика конфіденційності</Link>
                </li>
                <li className="footer__list-menu-item">
                    <Link to='/' className="footer__list-link">Для преси</Link>
                </li>
            </ul>

            <a
                href="https://t.me/olexandrsin"
                target="_blank"
                className="footer__creator-link"
            >
                Розроблено @olexandrsin
            </a>

        </footer>
    )
}