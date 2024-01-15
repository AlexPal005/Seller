import './App.css'
import {Header} from "./components/Header/Header.tsx";
import {Footer} from "./components/Footer/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import {CreatePost} from "./pages/CreatePost/CreatePost.tsx";

function App() {

    return (
        <>
            <Header/>
            <div className='content'>
                <Routes>
                    <Route path="/create-post" element={<CreatePost/>}/>
                </Routes>
            </div>
            <Footer/>
        </>
    )
}

export default App
