import React, {useContext, useEffect, useState} from 'react';
import './mini-chat.scss';
import {User} from "../../../Hooks/Auth.tsx";
import {useChat} from "../../../Hooks/Chat.tsx";
import {Product} from "../../../Hooks/Product.tsx";
import {UserContext} from "../../../App.tsx";
import {useMessage} from "../../../Hooks/Message.tsx";

type MiniChatProps = {
    user: User;
    product: Product;
    onClose: () => void;
};

export const MiniChat: React.FC<MiniChatProps> = ({user, onClose, product}) => {
    const [message, setMessage] = useState('');
    const {createChat} = useChat()
    const {User} = useContext(UserContext)
    const {createMessage} = useMessage()
    const handleSendMessage = () => {
        if (message.length > 2) {
            try {
                if (User.userId && user.userId) {
                    createChat(User.userId, user.userId, product.productId)
                        .then((res) => {
                            if (User.userId) {
                                createMessage(message, res.data.id, User.userId).then(() => {
                                    console.log('Message sent:', message);
                                    setMessage('');
                                })
                            }
                        })
                }
            } catch (err) {
                console.log(err)
            }
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
                >Відправити
                </button>
            </div>
        </div>
    );
};