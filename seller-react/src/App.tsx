import './App.scss'
import {Header} from "./components/Header/Header.tsx";
import {Footer} from "./components/Footer/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import {CreatePost} from "./pages/CreatePost/CreatePost.tsx";
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

    const {
        getUser,
        signIn,
        signUp,
        User,
        getUserByEmail,
        logOut
    } = useAuth()


    useEffect(() => {
        if (!User.email) {
            getUser().catch(console.log)
        }
    }, [User, getUser])

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
                    <Route path="/create-post" element={<CreatePost/>}/>
                    <Route path="/confirm-auth" element={<ConfirmAuth/>}/>
                    {
                        Object.keys(User).length !== 0 ?
                            <Route path="/account/*" element={<Account/>}/>
                            :
                            <Route path="/auth/*" element={<Auth/>}/>
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
