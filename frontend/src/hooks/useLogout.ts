import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUserService } from "../services/AuthService";
import { useAuth } from "./useAuth";

export function useLogout(){
    const navigation = useNavigate();
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function logoutUser(): Promise<void>{
        try{
            setLoading(true);
            setError("");
            await logoutUserService();
        }catch(err){

        }finally{
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
            setLoading(false);
            navigation("/");
        }
    }

    return {loading, error, logoutUser}
}