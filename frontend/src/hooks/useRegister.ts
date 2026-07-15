import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../services/AuthService";
import { useAuth } from "./useAuth";

export function useRegister() {
    const navigation = useNavigate();
    const { setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function registerUser(name: string, email: string, password: string, password_confirmation: string){
        try{
            setLoading(true);
            if(password.length <6){
                setError("A senha deve ter no mínimo 6 caracteres");
                return;
            }
            if(password !== password_confirmation){
                setError("As senhas não coincidem.");
                return;
            }
            const { user, token } = await registerUserService({
                name,
                email,
                password,
                password_confirmation,
            });
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setUser(user);
            navigation("/chat")
        }catch(err){
            setError("Error ao criar conta");
            throw err;
        }finally{
            setLoading(false);
        }
    }

    return {registerUser, error, loading}
}