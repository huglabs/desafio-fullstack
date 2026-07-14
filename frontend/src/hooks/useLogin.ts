import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserService } from "../services/AuthService";
import { useAuth } from "./useAuth";

export function useLogin(){
    const navigation = useNavigate();
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function loginUser(email: string, password: string): Promise<void>{
        try{
            setLoading(true);
            setError("");
            const {user, token} = await loginUserService({
                email,
                password
            });
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            navigation("/chat")
        }catch(err){
            setError("Email ou senha invalidos");
            throw err;
        }finally{
            setLoading(false)
        }
    }

    return {loading, error, loginUser}

}