export interface Message {
    id: number,
    room_id: number;
    body: string,
    user: {
        id: number,
        name: string,
    },
    created_at: string,
}

export interface CreateMessagePayload {
    body: string;
}

export interface MessagesListProps {
    messages: Message[];
    currentUserId?: number;
    hasMore?: boolean;
    loadingMore?: boolean;
    onLoadMore?: () => void;
}

export interface MessageInputProps {
    onSendMessage: (content: string) => void;
    disabled?: boolean;
}

export interface ChatHeaderProps {
    roomName: string;
}

export interface PaginatedMessages {
    messages: Message[];
    currentPage: number;
    lastPage: number;
}