import './logo.scss'
import {Link} from "react-router-dom";

interface logoProps {
    logoSize: number;
}

export const Logo = ({logoSize}: logoProps) => {

    const logoStyleSize = {
        fontSize: logoSize,
    }

    return (
        <>
            <Link style={logoStyleSize} className='logo' to='/'>Seller</Link>
        </>
    )
}