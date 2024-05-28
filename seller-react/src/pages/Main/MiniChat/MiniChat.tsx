import React, { useState} from 'react';
import './mini-chat.scss';
import {User} from "../../../Hooks/Auth.tsx";

type MiniChatProps = {
    user: User;
    onClose: () => void;
};

export const MiniChat: React.FC<MiniChatProps> = ({ user, onClose }) => {
    const [message, setMessage] = useState('');
    const handleSendMessage = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if(message.length > 2){

            console.log('Message sent:', message);
            setMessage('');
            onClose();
        }
    };

    return (
        <div className='mini-chat'>
            <div className='mini-chat__header'>
                <h3>Чат з {user.firstName}</h3>
                <button className='mini-chat__close' onClick={onClose}>X</button>
            </div>
            <div className='mini-chat__body'>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Напишіть повідомлення...'
                />
            </div>
            <div className='mini-chat__footer'>
                <button className='mini-chat__send'
                        onClick={handleSendMessage}
                >Відправити</button>
            </div>
        </div>
    );
};