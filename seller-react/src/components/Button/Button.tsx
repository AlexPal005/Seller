import './button.scss'
import React from "react";

interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    onClick?: (e: { preventDefault: () => void; }) => void;
    className?: string,
}

export const Button = ({text, onClick, className, ...attributes}: buttonProps) => {
    return (
        <button className={'button ' + className} onClick={onClick}  {...attributes}>
            {text}
        </button>
    )
}