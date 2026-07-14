import { useState, useEffect } from "react";
import { ChatLayout } from "../../components/ChatLayout";
import { RoomSidebar } from "../../components/SidebarRoom";
import { ChatHeader } from "../../components/ChatHeader";
import { MessagesList } from "../../components/MessageList";
import { MessageInput } from "../../components/MessageInput";
import { useRooms } from "../../hooks/useRooms";
import { useMessages } from "../../hooks/useMessage";
import { CreateRoomModal } from "../../components/ModalCreateRoom";
import { useAuth } from "../../hooks/useAuth";
import { useLogout } from "../../hooks/useLogout";

export function ChatPage() {
    const { user } = useAuth();
    const { logoutUser } = useLogout();
    const { rooms, joinRoom, createRoom} = useRooms();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeRoomId, setActiveRoomId] = useState<number | null>(null);
    const { messages, sendMessage, hasMore, loadingMore, loadMoreMessages } = useMessages(activeRoomId);

    const activeRoom = rooms.find((room) => room.id === activeRoomId);
    
    async function handleSelectRoom(roomId: number) {
        await joinRoom(roomId);
        setActiveRoomId(roomId);
    }
    useEffect(() => {
        if (rooms.length > 0 && activeRoomId === null) {
            handleSelectRoom(rooms[0].id);
        }
    }, [rooms, activeRoomId]);

    async function handleSendMessage(body: string) {
        await sendMessage(body);
    }

    async function handleCreateRoom(name: string, description: string) {
        const newRoom = await createRoom({ name, description });
        setActiveRoomId(newRoom.id); 
    }

    return (
        <ChatLayout>
            <RoomSidebar
                rooms={rooms}
                activeRoomId={activeRoomId ?? 0}
                onSelectRoom={handleSelectRoom}
                onCreateRoomClick={() => setIsCreateModalOpen(true)}
                onLogout={logoutUser}
            />

            <section className="flex flex-col flex-1">
                <ChatHeader roomName={activeRoom?.name ?? "Selecione uma sala"} />
                <MessagesList
                    messages={messages}
                    currentUserId={user?.id}
                    hasMore={hasMore}
                    loadingMore={loadingMore}
                    onLoadMore={loadMoreMessages}
                />
                <MessageInput onSendMessage={handleSendMessage} disabled={!activeRoomId} />
            </section>
            {isCreateModalOpen && ( 
                <CreateRoomModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onCreate={handleCreateRoom}
                />
            )}

        </ChatLayout>
    );
}