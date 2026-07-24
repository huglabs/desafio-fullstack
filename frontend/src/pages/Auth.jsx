import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

export default function Auth() {
    const { login } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    
    // Estados do formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const endpoint = isLogin ? '/login' : '/register';
            const payload = isLogin ? { email, password } : { name, email, password };
            
            const response = await api.post(endpoint, payload);
            
            // Salva o token e os dados do usuário no contexto
            login(response.data.access_token, response.data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Ocorreu um erro. Tente novamente.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
            <h2>{isLogin ? 'Entrar no Chat' : 'Criar uma Conta'}</h2>
            
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {!isLogin && (
                    <input 
                        type="text" 
                        placeholder="Seu Nome" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                )}
                <input 
                    type="email" 
                    placeholder="Seu E-mail" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Sua Senha" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">
                    {isLogin ? 'Entrar' : 'Registrar'}
                </button>
            </form>

            <p style={{ marginTop: '20px', cursor: 'pointer', color: 'blue' }} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Não tem uma conta? Registre-se.' : 'Já tem uma conta? Entre aqui.'}
            </p>
        </div>
    );
}