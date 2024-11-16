import './App.scss'
import {Header} from "./components/Header/Header.tsx";
import {Footer} from "./components/Footer/Footer.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import {CreatePost} from "./pages/CreatePost/CreatePost/CreatePost.tsx";
import {Auth} from "./pages/Authorization/Auth.tsx";
import {ConfirmAuth} from "./pages/Authorization/ConfirmAuth.tsx";
import {Main} from "./pages/Main/Main/Main.tsx";
import {Account} from "./pages/Account/Account.tsx";
import {AuthFunctions, useAuth} from "./Hooks/Auth.tsx";
import {createContext, useEffect} from "react";
import {BottomMenu} from "./components/BottomMenu/BottomMenu.tsx";


const defaultUserContext: AuthFunctions = {
    getUser: async () => console.log("attempting to use AuthContext outside of a valid provider"),
    signIn: async () => console.log("attempting to use AuthContext outside of a valid provider"),
    signUp: async () => console.log("attempting to use AuthContext outside of a valid provider"),
    getUserByEmail: async () => console.log("attempting to use AuthContext outside of a valid provider"),
    logOut: async () => console.log("attempting to use AuthContext outside of a valid provider"),
    User: {}
}
export const UserContext = createContext(defaultUserContext);

function App() {
    const navigate = useNavigate()

    const {
        getUser,
        signIn,
        signUp,
        User,
        getUserByEmail,
        logOut
    } = useAuth()


    useEffect(() => {
        if (!User) {
            getUser().catch(console.log)
        }
    }, [User, getUser])

    // when the page reloads it will stay here
    useEffect(() => {
        navigate(JSON.parse(window.sessionStorage.getItem('lastRoute') || '{}'))
        window.onbeforeunload = () => {
            window.sessionStorage.setItem('lastRoute', JSON.stringify(window.location.pathname))
        }
    }, [])

    return (
        <UserContext.Provider value={{
            getUser,
            signIn,
            signUp,
            User,
            getUserByEmail,
            logOut
        }}>
            <Header/>
            <div className='content'>
                <Routes>
                    <Route path="/*" element={<Main/>}/>
                    {
                        User ?
                            <>
                                <Route path="/account/*" element={<Account/>}/>
                                <Route path="/create-post/*" element={<CreatePost/>}/>
                            </>
                            :
                            <>
                                <Route path="/auth/*" element={<Auth/>}/>
                                <Route path="/confirm-auth" element={<ConfirmAuth/>}/>
                            </>

                    }
                    <Route
                        path="*"
                        element={<Main/>}
                    />
                </Routes>
            </div>
            <BottomMenu/>
            <Footer/>
        </UserContext.Provider>
    )
}

export default App
