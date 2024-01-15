import {Link} from "react-router-dom"
import './footer.scss'

export const Footer = () => {
    return (
        <footer className='footer'>
            <ul>
                <li>
                    <Link to='/'>Умови користування</Link>
                </li>
            </ul>
        </footer>
    )
}