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