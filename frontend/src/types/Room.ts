export interface Room {
    id: number,
    name: string,
    description: string | null,
    created_by: number,
    created_name?: string,
    created_at: string,
}

export interface CreateRoomPayload {
    name: string;
    description?: string;
}

export interface RoomItemProps {
    room: Room;
    active: boolean;
    onClick: () => void;
}

export interface RoomSidebarProps {
    rooms: Room[];
    activeRoomId: number;
    onSelectRoom: (id: number) => void;
    onCreateRoomClick: () => void;
    onLogout: () => void;
}

interface CreateRoomModalProps {
    onClose: () => void;
    onCreate: (name: string, description: string) => Promise<void>;
}