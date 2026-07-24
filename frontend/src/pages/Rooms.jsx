import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

export default function Rooms() {
    const { user, logout } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Busca as salas assim que o componente é montado
    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await api.get('/rooms');
            setRooms(response.data);
        } catch (err) {
            console.error("Erro ao buscar salas", err);
        }
    };

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        if (!newRoomName.trim()) return;

        try {
            const response = await api.post('/rooms', { name: newRoomName });
            // Adiciona a nova sala no topo da lista
            setRooms([response.data, ...rooms]);
            setNewRoomName('');
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao criar sala.');
        }
    };

    const handleLogout = async () => {
        try {
            await api.post('/logout'); // Invalida o token no backend
        } catch (err) {
            console.error(err);
        } finally {
            logout(); // Limpa o estado e o localStorage no frontend
        }
    };

    const enterRoom = (roomId) => {
        navigate(`/chat/${roomId}`);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '30px auto', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Olá, {user?.name}! 👋</h2>
                <button onClick={handleLogout} style={{ padding: '5px 10px', background: '#ff4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Sair
                </button>
            </div>

            <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3>Criar Nova Sala</h3>
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <form onSubmit={handleCreateRoom} style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Nome da sala..."
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        style={{ flex: 1, padding: '8px' }}
                        required
                    />
                    <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>Criar</button>
                </form>
            </div>

            <h3>Salas Disponíveis</h3>
            {rooms.length === 0 ? (
                <p>Nenhuma sala criada ainda. Seja o primeiro!</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {rooms.map(room => (
                        <div 
                            key={room.id} 
                            onClick={() => enterRoom(room.id)}
                            style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                        >
                            <strong>{room.name}</strong>
                            <span style={{ color: '#0066cc' }}>Entrar →</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}