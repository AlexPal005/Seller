import './chat.scss'
import {IoMdSend} from "react-icons/io";
import {SetStateAction, useContext, useEffect, useRef, useState} from "react";
import {MessagesContext} from "../Messages.tsx";
import {Message, useMessage} from "../../../../Hooks/Message.tsx";
import {UserContext} from "../../../../App.tsx";
import {uk} from 'date-fns/locale';
import {format} from 'date-fns';


export const Chat = () => {
    const {currentChatId} = useContext(MessagesContext)
    const {messages, getMessagesByChatId, createMessage} = useMessage()
    const [groupedMessages, setGroupedMessages] =
        useState<Record<string, Message[]>>({})
    const {User} = useContext(UserContext)
    const [updateMessages, setUpdateMessages] = useState(-1)

    const [createdMessage, setCreatedMessage] = useState('')
    const inputMessageRef = useRef<HTMLInputElement>(null)
    const messagesBlockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getMessagesByChatId(currentChatId)
    }, [currentChatId, getMessagesByChatId, updateMessages])


    useEffect(() => {
        setGroupedMessages(groupMessagesByDate(messages))
    }, [messages])

    useEffect(() => {
        scrollToBottom();
    }, [groupedMessages]);

    const groupMessagesByDate = (messages: Message[]) => {
        const groupedMessages = messages.reduce((groups: Record<string, Message[]>, message: Message) => {
            const date = message.createdAt.split('T')[0]
            if (!groups[date]) {
                groups[date] = []
            }
            groups[date].push(message)
            return groups
        }, {})

        const sortedDates = Object.keys(groupedMessages).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

        return sortedDates.reduce((acc, date) => {
            acc[date] = groupedMessages[date]
            return acc;
        }, {} as Record<string, Message[]>)
    };


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'd MMMM', {locale: uk});
    };

    const onChangeNewMessage = (e: { target: { value: SetStateAction<string>; }; }) => {
        setCreatedMessage(e.target.value)
    }
    const createMessageSend = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const userId = User.userId || 0
        const input = inputMessageRef.current;

        if (input) {
            if (createdMessage) {
                createMessage(createdMessage, currentChatId, userId).then(res => {
                    console.log(res)
                    input.value = '';
                    setUpdateMessages(prev => prev + 1)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }

    const scrollToBottom = () => {
        if (messagesBlockRef.current) {
            messagesBlockRef.current.scrollTop = messagesBlockRef.current.scrollHeight;
        }
    };

    return (
        <div className='account-chat'>
            {
                currentChatId === -1 ?
                    <h3 className='account-chat__info'>Виберіть повідомлення, щоб прочитати його!</h3> :
                    <>
                        <div className='account-chat__messages-block' ref={messagesBlockRef}>
                            {Object.keys(groupedMessages).map(date => (
                                <div key={date}>

                                    <div className='account-chat__date'>
                                        <div className="account-chat__date-line"></div>
                                        <span className='account-chat__date-value'>{formatDate(date)}</span>
                                        <div className="account-chat__date-line"></div>
                                    </div>
                                    {groupedMessages[date].map(message => (
                                        <MessageItem message={message} key={message.messageId}/>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <input
                            type='text'
                            placeholder='Напишіть повідомлення'
                            className='account-chats__input'
                            onChange={onChangeNewMessage}
                            ref={inputMessageRef}
                        />
                        <IoMdSend className='account-chat__send' onClick={createMessageSend}/>
                    </>

            }
        </div>
    )
}

interface MessageProps {
    message: Message;
}

const MessageItem = ({message}: MessageProps) => {

    const {User} = useContext(UserContext)

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
    }

    return (
        <div className={message.userId === User.userId ? 'message-right' : 'message-left'}>
            <div className={message.userId === User.userId ? 'message__content-right' : ''}>
                <div className='account-chat__message'>
                    <span>{message.text}</span>
                </div>
                <p className='account-chat__time'>
                    {formatTime(message.createdAt)}
                </p>
            </div>
        </div>
    )
}
