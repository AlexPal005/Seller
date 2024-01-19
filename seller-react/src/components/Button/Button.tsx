import './button.scss'

interface buttonProps {
    text: string;
    onClick: () => void;
    className: string
}

export const Button = ({text, onClick, className}: buttonProps) => {
    return (
        <button className={'button ' + className} onClick={onClick}>
            {text}
        </button>
    )
}