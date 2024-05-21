import {useCallback, useEffect, useState} from "react";
import Axios from "../Axios.ts";
import {User} from "./User.tsx";
import {ProductMainType} from "./Product.tsx";

export interface Chat {
    id: number;
    user1: User;
    user2: User;
    product: ProductMainType;
}

export function useChat() {
    const [chats, setChats] = useState<Chat[]>([])

    const getChatsByUserId = useCallback((userId: number) => {
        Axios.get(`/chat/getChatsByUserId/${userId}`).then(res => {
            setChats(res.data)
        }).catch(err => {
            throw err
        })

    }, [])

    useEffect(() => {
        console.log(chats)
    }, [chats]);

    return {
        getChatsByUserId,
        chats
    }
}