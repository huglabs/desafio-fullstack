import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    // Enquanto o useEffect do AuthContext estiver validando o token, mostramos um loading
    if (loading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando...</div>;
    }

    // Se a validação terminou e não tem usuário, manda pro login
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Se estiver tudo certo, renderiza o componente filho (a tela restrita)
    return children;
}