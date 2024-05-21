import './chat-item.scss'
import image from './../../../../assets/detskiy-mir-36-1x.png'
import {Chat} from "../../../../Hooks/Chat.tsx";
import {useContext} from "react";
import {MessagesContext} from "../Messages.tsx";

interface ChatItemProps {
    chat: Chat;
}

export const ChatItem = ({chat}: ChatItemProps) => {
    const {setCurrentChatId} = useContext(MessagesContext)
    return (
        <div className='chat-item' onClick={() => {
            setCurrentChatId(chat.id)
        }}>
            <div className='chat-item__image-block'>
                <img src={image} alt='Фото' className='chat-item__image'/>
            </div>
            <div>
                <p className='chat-item__username'>{chat.user2?.firstName}</p>
                <p className='chat-item__product'>{chat.product.name}</p>
                <p className='chat-item__last-message'>Доброго вечора, у якого саме майстра проводилося ТО?</p>
            </div>
        </div>
    )
}