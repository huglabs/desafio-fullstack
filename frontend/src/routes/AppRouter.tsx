import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/auth/login";
import { RegisterPage } from "../pages/auth/register";
import { RoomsPage } from "../pages/rooms";
import { ChatPage } from "../pages/chat";

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/Rooms" element={<RoomsPage/>}/>
                <Route path="/chat/:roomId" element={<ChatPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}
