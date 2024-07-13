import {useCallback, useEffect, useState} from "react";
import Axios from "../Axios.ts";
import {User} from "./Auth.tsx";
import {Product} from "./Product.tsx";

export interface Chat {
    id: number;
    user1: User;
    user2: User;
    product: Product;
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

    const createChat = useCallback((user1Id: number, user2Id: number, productId: number) => {
       return  Axios.post('/chat/create',
            {
                user1Id: user1Id,
                user2Id: user2Id,
                productId: productId
            })
    }, [])

    useEffect(() => {
        console.log(chats)
    }, [chats]);

    return {
        getChatsByUserId,
        chats,
        createChat
    }
}