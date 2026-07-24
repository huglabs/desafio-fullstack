/*
 Arquivo criado com o propósito de fornecer um contexto de autenticação
 O Contexto vai guardar o estado do usuário logado e as funções de entrar e sair
 para serem acessados por qualquer parte do app 
*/

import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Verifica se já existe um token ao carregar a página
    useEffect(() => {
        const token = localStorage.getItem('chat_token');
        if (token) {
            api.get('/user')
                .then(response => setUser(response.data))
                .catch(() => logout()) // Se der erro (ex: token expirado), faz logout
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = (token, userData) => {
        localStorage.setItem('chat_token', token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('chat_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};