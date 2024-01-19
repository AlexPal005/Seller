import './App.scss'
import {Header} from "./components/Header/Header.tsx";
import {Footer} from "./components/Footer/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import {CreatePost} from "./pages/CreatePost/CreatePost.tsx";
import {Auth} from "./pages/Authorization/Auth.tsx";
import {ConfirmAuth} from "./pages/Authorization/ConfirmAuth.tsx";

function App() {

    return (
        <>
            <Header/>
            <div className='content'>
                <Routes>
                    <Route path="/create-post" element={<CreatePost/>}/>
                    <Route path="/auth" element={<Auth/>}/>
                    <Route path="/confirm-auth" element={<ConfirmAuth/>}/>
                </Routes>
            </div>
            <Footer/>
        </>
    )
}

export default App
