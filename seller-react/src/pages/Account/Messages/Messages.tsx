import './messages.scss'
import {Chats} from "./Chats/Chats.tsx";
import {Chat} from "./Chat/Chat.tsx";


export const Messages = () => {
    return (
        <div className='account__main account-messages'>
            <Chats/>
            <Chat/>
        </div>
    )
}