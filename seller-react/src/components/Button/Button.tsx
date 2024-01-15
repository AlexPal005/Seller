import './button.scss'

interface buttonProps {
    text: string;
    onClick: () => void;

}

export const Button = ({text, onClick}: buttonProps) => {
    return (
        <button className='button' onClick={onClick}>
            {text}
        </button>
    )
}