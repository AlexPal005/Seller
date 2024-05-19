import './chat-item.scss'

export const ChatItem = () => {
    return (
        <div className='chat-item'>
            <div className='chat-item__image-block'>
                <img src={image} alt='Фото' className='chat-item__image'/>
            </div>
            <div>
                <p className='chat-item__username'>Юрій</p>
                <p className='chat-item__product'>Shimano stradic 19 2000s</p>
                <p className='chat-item__last-message'>Доброго вечора, у якого саме майстра проводилося ТО?</p>
            </div>
        </div>
    )
}