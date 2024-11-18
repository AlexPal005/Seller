import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Axios from "../Axios.ts";
import {jwtDecode} from "jwt-decode";

export interface User {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
}

export interface AuthFunctions {
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    logOut: () => void;
    getUser: (email?: string) => Promise<void>;
    getUserByEmail: (email: string) => Promise<void>;
    User: User | null | undefined;
    isLoadingUser: boolean;
}

interface JwtPayload {
    sub: string;
}

export function useAuth(): AuthFunctions {
    const navigate = useNavigate();

    const [User, setUser] = useState<User | null | undefined>(undefined)
    const [isLoadingUser, setIsLoadingUser] = useState(false)
    const signIn = async (email: string, password: string): Promise<void> => {
        setIsLoadingUser(true)
        return Axios.post('/auth/login', {email: email, password: password}).then(async (resp) => {
            console.log(resp.data)
            localStorage.setItem('accessToken', resp.data.accessToken)
            const decode: JwtPayload = jwtDecode(resp.data.accessToken)
            await getUser(decode.sub)
        }).catch(error => {
            console.log(error)
            throw new Error(error)
        }).finally(() => {
            setIsLoadingUser(false)
        })
    }

    const getUser = async (email?: string) => {
        setIsLoadingUser(true)
        if (!email) {
            const token: string | null = localStorage.getItem('accessToken')
            if (!token) {
                setUser(null)
                setIsLoadingUser(false)
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
        setIsLoadingUser(false)
    }

    const getUserByEmail = (email: string): Promise<void> => {
        return Axios.get(`/user/email/${email}`)
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
        setUser(null);
        navigate('/auth/login');
    }

    return {
        signIn,
        signUp,
        User,
        getUser,
        logOut,
        getUserByEmail,
        isLoadingUser
    };
}