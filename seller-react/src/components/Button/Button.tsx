import './button.scss'

export const Button = ({text}: { text: string }) => {
    return (
        <button className='button'>
            {text}
        </button>
    )
}