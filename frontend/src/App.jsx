import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';

// Placeholder temporário para a tela de Salas que vamos criar a seguir
const RoomsPlaceholder = () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Lista de Salas</h2>
        <p>Você está logado! A tela de salas entrará aqui em breve.</p>
    </div>
);

export default function App() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div style={{ padding: '50px', textAlign: 'center' }}>Inicializando chat...</div>;
    }

    return (
        <Router>
            <Routes>
                {/* Se o usuário tentar acessar a raiz e JÁ estiver logado, 
                    jogamos ele direto para as salas. Se não, mostramos o Auth. 
                */}
                <Route 
                    path="/" 
                    element={user ? <Navigate to="/rooms" replace /> : <Auth />} 
                />

                {/* Rota Protegida: Só acessa se o ProtectedRoute permitir 
                */}
                <Route 
                    path="/rooms" 
                    element={
                        <ProtectedRoute>
                            <RoomsPlaceholder />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
    );
}