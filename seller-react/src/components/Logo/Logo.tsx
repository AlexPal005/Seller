import './logo.scss'

interface logoProps {
    logoSize: number;
}

export const Logo = ({logoSize}: logoProps) => {

    const logoStyleSize = {
        fontSize: logoSize,
    }

    return (
        <>
            <span style={logoStyleSize} className='logo'>Seller</span>
        </>
    )
}