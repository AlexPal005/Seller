import './chats.scss'
import {Link} from "react-router-dom";
import {MdOutlineDeleteOutline} from "react-icons/md";
import {ChatItem} from "./ChatItem.tsx";
import {useChat} from "../../../../Hooks/Chat.tsx";
import {useContext, useEffect} from "react";
import {UserContext} from "../../../../App.tsx";

export const Chats = () => {
    const {chats, getChatsByUserId} = useChat()
    const {User} = useContext(UserContext)

    useEffect(() => {
        if (User.userId) {
            getChatsByUserId(User.userId)
        }

    }, [User.userId, getChatsByUserId]);

    useEffect(() => {
        console.log(chats)
    }, [chats]);

    return (
        <div className='account-chats'>
            <div className='account-chats__basket-block'>
                <Link to='/' className='account-chats__basket-link'>
                    <MdOutlineDeleteOutline className='account-chats__basket-icon'/>
                    <p>Кошик</p>
                </Link>
            </div>
            <div className='account-chats__buttons'>
                <button className='account-chats__button'>Купую</button>
                <button className='account-chats__button'>Продаю</button>
            </div>
            <div className='account-chats__list'>
                <h3 className='account-chats__list-title'>Непрочитані</h3>
                <hr/>
                <div className='account-chats__list-item'>
                    {
                        chats.map(chat => {
                            return (
                                <ChatItem chat={chat} key={chat.id}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}