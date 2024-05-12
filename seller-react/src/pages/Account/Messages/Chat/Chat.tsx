import './chat.scss'


const Message = () => {
    return (
        <div className='message'>
            <div className='account-chat__message'>
                <span> Доброго вечора, у якого саме майстра проводилося ТО?</span>
            </div>
            <p className='account-chat__time'>20:43</p>
        </div>
    )
}
export const Chat = () => {
    return (
        <div className='account-chat'>
            <Message/>
            <input type='text' placeholder='Напишіть повідомлення' className='account-chats__input'/>
        </div>
    )
}