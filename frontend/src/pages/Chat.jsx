import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';
import echo from '../services/echo';

export default function Chat() {
    const { roomId } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [typingUsers, setTypingUsers] = useState([]);
    const messagesEndRef = useRef(null);
    let typingTimeout = null;

    // Efeito para carregar o histórico e conectar ao WebSocket
    useEffect(() => {
        // 1. Busca o histórico de mensagens (Página 1)
        api.get(`/rooms/${roomId}/messages`)
            .then(response => {
                // Invertemos a ordem pois a API retorna as mais recentes primeiro
                setMessages(response.data.data.reverse());
            })
            .catch(() => navigate('/rooms')); // Se a sala não existir, volta

        // 2. Conecta ao canal de presença da sala
        const channel = echo.join(`room.${roomId}`);

        channel
            // Quem já está na sala
            .here((users) => setOnlineUsers(users))
            // Alguém entrou
            .joining((joinedUser) => {
                setOnlineUsers(prev => {
                    // Previne duplicação de usuários na lista
                    if (prev.some(u => u.id === joinedUser.id)) return prev;
                    return [...prev, joinedUser];
                });
            })
            // Alguém saiu
            .leaving((leftUser) => setOnlineUsers(prev => prev.filter(u => u.id !== leftUser.id)))
            // Escuta novas mensagens
            .listen('MessageSent', (event) => {
                setMessages(prev => {
                    // Previne duplicação de mensagens checando o ID que veio do banco
                    if (prev.some(msg => msg.id === event.id)) return prev;
                    return [...prev, event];
                });
            })
            // Escuta o evento de "digitando..." (Whisper)
            .listenForWhisper('typing', (event) => {
                setTypingUsers(prev => {
                    if (!prev.includes(event.name)) return [...prev, event.name];
                    return prev;
                });

                // Remove o aviso de "digitando" após 2 segundos
                setTimeout(() => {
                    setTypingUsers(prev => prev.filter(name => name !== event.name));
                }, 2000);
            });

        // Cleanup: sai do canal quando o componente for desmontado (usuário sair da tela)
        return () => {
            echo.leave(`room.${roomId}`);
        };
    }, [roomId, navigate]);

    // Efeito para rolar a tela para baixo sempre que uma nova mensagem chegar
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const content = newMessage;
        setNewMessage(''); // Limpa o input imediatamente para boa UX

        try {
            await api.post(`/rooms/${roomId}/messages`, { content });
            // Não é necessário adicionar a mensagem ao state aqui, pois 
            // o evento 'MessageSent' do WebSocket já faz isso
        } catch (err) {
            console.error("Erro ao enviar mensagem", err);
        }
    };

    const handleTyping = (e) => {
        setNewMessage(e.target.value);
        
        // Dispara o evento "whisper" sem precisar ir ao banco de dados
        echo.join(`room.${roomId}`).whisper('typing', {
            name: user.name
        });
    };

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
            {/* Sidebar com Usuários Online */}
            <div style={{ width: '250px', background: '#2c3e50', color: 'white', padding: '20px' }}>
                <button onClick={() => navigate('/rooms')} style={{ marginBottom: '20px', padding: '5px' }}>
                    ← Voltar às Salas
                </button>
                <h3>Usuários Online ({onlineUsers.length})</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {onlineUsers.map(u => (
                        <li key={u.id} style={{ marginBottom: '10px' }}>🟢 {u.name} {u.id === user.id && '(Você)'}</li>
                    ))}
                </ul>
            </div>

            {/* Área principal do Chat */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
                {/* Lista de Mensagens */}
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                    {messages.map((msg, index) => {
                        const isMine = msg.user.id === user.id;
                        return (
                            <div key={msg.id || index} style={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start', marginBottom: '15px' }}>
                                <div style={{ 
                                    background: isMine ? '#0084ff' : '#e4e6eb', 
                                    color: isMine ? 'white' : 'black',
                                    padding: '10px 15px', 
                                    borderRadius: '15px', 
                                    maxWidth: '70%' 
                                }}>
                                    {!isMine && <small style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>{msg.user.name}</small>}
                                    <div>{msg.content}</div>
                                </div>
                            </div>
                        );
                    })}
                    {/* Referência invisível para o auto-scroll */}
                    <div ref={messagesEndRef} />
                </div>

                {/* Área de Input */}
                <div style={{ padding: '20px', background: 'white', borderTop: '1px solid #ccc' }}>
                    {typingUsers.length > 0 && (
                        <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px', fontStyle: 'italic' }}>
                            {typingUsers.join(', ')} {typingUsers.length > 1 ? 'estão digitando...' : 'está digitando...'}
                        </div>
                    )}
                    <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Digite sua mensagem..."
                            value={newMessage}
                            onChange={handleTyping}
                            style={{ flex: 1, padding: '12px', borderRadius: '20px', border: '1px solid #ccc' }}
                        />
                        <button type="submit" style={{ padding: '0 20px', borderRadius: '20px', background: '#0084ff', color: 'white', border: 'none', cursor: 'pointer' }}>
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}