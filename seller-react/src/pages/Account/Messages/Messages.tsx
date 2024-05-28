import './messages.scss'
import {Chats} from "./Chats/Chats.tsx";
import {Chat} from "./Chat/Chat.tsx";
import React, {createContext, useState} from "react";

type MessagesContextType = {
    setCurrentChatId: React.Dispatch<React.SetStateAction<number>>,
    currentChatId: number
}
const defaultMessageContext = {
    setCurrentChatId: () => {
    },
    currentChatId: -1
}

export const MessagesContext =
    createContext<MessagesContextType>(defaultMessageContext)
export const Messages = () => {
    const [currentChatId, setCurrentChatId] =
        useState<number>(-1)
    return (
        <MessagesContext.Provider value={{
            setCurrentChatId,
            currentChatId
        }}>
            <div className='account__main account-messages'>
                <Chats/>
                <Chat/>
            </div>
        </MessagesContext.Provider>
    )
}