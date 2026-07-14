import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/auth/login";
import { RegisterPage } from "../pages/auth/register";
import { ChatPage } from "../pages/chat";
import { useAuth } from "../hooks/useAuth";


export default function AppRoutes(){
    const { isAuthenticated } = useAuth();

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route 
                    path="/chat" 
                    element={ isAuthenticated ? <ChatPage/> : <Navigate to="/" replace/>}/>
            </Routes>
        </BrowserRouter>
    )
}
