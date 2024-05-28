import {useState} from "react";
import {User} from "./Auth.tsx";
import Axios from "../Axios.ts";


export const useUser = () => {
    const [user, setUser] = useState<User>({})

    const getUserByProductId = (productId: number) => {
        Axios.get(`/user/getUserByProductId/${productId}`).then(res => {
            setUser(res.data[0])
        }).catch(err => {
            throw err
        })
    }

    return {
        getUserByProductId,
        user
    }
}