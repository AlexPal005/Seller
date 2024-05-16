import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Axios from "../Axios.ts";
import {jwtDecode} from "jwt-decode";

export interface User {
    userId?: number;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
}

export interface AuthFunctions {
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    logOut: () => void;
    getUser: (email?: string) => Promise<void>;
    getListProducts: () => Promise<void>;
    getUserByEmail: (email: string) => Promise<void>;
    updateUser: (firstName: string, lastName: string, userId: string) => Promise<void>;
    getUsersByFullName: () => Promise<void>;
    getListProductsByUserId: () => Promise<void>;
    User: User;
}

interface JwtPayload {
    sub: string;
}

export function useAuth(): AuthFunctions {
    const navigate = useNavigate();

    const [User, setUser] = useState({})

    const signIn = async (email: string, password: string): Promise<void> => {
        return Axios.post('/auth/login', {email: email, password: password}).then(resp => {
            console.log(resp.data)
            localStorage.setItem('accessToken', resp.data.accessToken)
            const decode: JwtPayload = jwtDecode(resp.data.accessToken)
            getUser(decode.sub)
        }).catch(error => {
            console.log(error)
            throw new Error(error)
        })
    }

    const getUser = async (email?: string): Promise<void> => {
        if (!email) {
            const token: string | null = localStorage.getItem('accessToken')
            if (!token) {
                return
            }

            const decode: { sub?: string } = jwtDecode(token)
            email = decode?.sub || ''
        }
        try {
            const response = await Axios.get(`/user/getByEmail/${email}`)
            setUser(response.data)
        } catch {
            logOut()
        }
    };

    const getUserByEmail = (email: string): Promise<void> => {
        return Axios.get(`/user/email/${email}`)
    }

    const getListProducts = (): Promise<void> => {
        return Axios.get('/user/products')
    }

    const getListProductsByUserId = (userId: string = ''): Promise<void> => {
        return Axios.get(`/user/${userId}/products`)
    }

    const signUp = async (email: string, password: string): Promise<void> => {
        try {
            await Axios.post('/auth/register', {email: email, password: password});
            await signIn(email, password);
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const logOut = (): void => {
        localStorage.clear()
        console.log("storage cleared");
        setUser({});
        navigate('/auth/login');
    }

    const updateUser = (firstName: string, lastName: string, userId: string = ''): Promise<void> => {
        return Axios.put(`user/${userId}`, {firstName, lastName})
    }

    const getUsersByFullName = (fullName = ''): Promise<void> => {
        return Axios.get(`user/?like=${fullName}`);
    }

    return {
        signIn,
        signUp,
        User,
        getUser,
        getListProducts,
        logOut,
        getUserByEmail,
        updateUser,
        getUsersByFullName,
        getListProductsByUserId,
    };
}