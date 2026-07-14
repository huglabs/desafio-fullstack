import { useState } from "react"
import { AuthLayout } from "../../../components/AuthLayout"
import { Button } from "../../../components/Button"
import { Input } from "../../../components/Input"
import { Link } from "react-router-dom"
import { useLogin } from "../../../hooks/useLogin"
import { Mail, Lock } from 'lucide-react';

export function LoginPage(){

    const { loginUser , loading, error } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(loading){
            return;
        }
        await loginUser(email, password);
    }
    
    return(
        <AuthLayout 
            title="Chat" 
            footer={
                <p className="text-text-secondary">
                    Não tem uma conta?{" "}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                        Criar conta
                    </Link>
                </p>
            }>
            <p className="text-center text-sm text-text-secondary -mt-4 mb-6">
                Comunicação em tempo real
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input 
                    label="E-mail" 
                    type="email" 
                    placeholder="teste@gmail.com" 
                    value={email}
                    icon={Mail}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input 
                    label="Senha" 
                    type="password" 
                    placeholder="******" 
                    value={password}
                    icon={Lock}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <span className="text-xs text-text-error text-center font-medium">
                        {error}
                    </span>
                )}

                <Button type="submit" disabled={loading}>
                    {loading ? "Carregando..." : "Entrar"}
                </Button>
            </form>
        </AuthLayout>
    )
}
