
import {useCallback, useEffect, useState} from "react";
import Axios from "../Axios.ts";

export interface Message {
    messageId: number;
    userId: number;
    text: string;
    createdAt: string;
}

export function useMessage() {
    const [messages, setMessages] = useState<Message[]>([])

    const getMessagesByChatId = useCallback((chatId: number) => {
        Axios.get(`/message/getMessagesByChatId/${chatId}`).then(res => {
            setMessages(res.data)
        }).catch(err => {
            throw err
        })

    }, [])

    const createMessage = useCallback((text: string, chatId: number, userId: number) => {
        return new Promise((resolve, reject) => {
            Axios.post('/message/create', {
                text: text,
                chatId: chatId,
                userId: userId
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }, [])

    useEffect(() => {
        console.log(messages)
    }, [messages]);

    return {
        getMessagesByChatId,
        messages,
        createMessage
    }
}
