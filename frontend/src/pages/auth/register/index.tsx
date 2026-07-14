import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../../components/AuthLayout";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { useRegister } from "../../../hooks/useRegister";
import { User, Mail, Lock } from "lucide-react"; 

export function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {loading, error, registerUser} = useRegister();

    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(loading) {
            return;
        }
        await registerUser(name,email, password, confirmPassword);
    }
    

    return (
        <AuthLayout 
            title="Relay" 
            footer={
                <p className="text-text-secondary">
                    Já tem conta?{" "}
                    <Link to="/" className="text-primary hover:underline font-medium">
                        Entrar
                    </Link>
                </p>
            }>
            
            <div className="flex flex-col items-center -mt-4 mb-6">
                <p className="text-center text-sm text-text-secondary">
                    Comunicação em tempo real
                </p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input 
                    label="Nome" 
                    type="text" 
                    placeholder="Seu nome" 
                    value={name}
                    icon={User}
                    required
                    onChange={(e) => setName(e.target.value)}
                />

                <Input 
                    label="E-mail" 
                    type="email" 
                    placeholder="voce@exemplo.com" 
                    value={email}
                    icon={Mail} 
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input 
                    label="Senha" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    icon={Lock} 
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Input 
                    label="Confirmar Senha" 
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    icon={Lock} 
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {error && (
                    <span className="text-xs text-text-error text-center font-medium">
                        {error}
                    </span>
                )}

                <Button type="submit" disabled={loading}>
                    {loading ? "Cadastrando..." : "Criar conta →"}
                </Button>
            </form>
        </AuthLayout>
    );
}