import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Auth from './pages/Auth';
import Rooms from './pages/Rooms';
import Chat from './pages/Chat';
import ProtectedRoute from './components/ProtectedRoute';

// Placeholder temporário para a tela de Chat que construiremos em seguida
const ChatPlaceholder = () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>A Sala de Chat entrará aqui</h2>
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
                            <Rooms />
                        </ProtectedRoute>
                    } 
                />

                {/* Nova rota parametrizada para o chat */}
                <Route 
                    path="/chat/:roomId" 
                    element={
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
    );
}