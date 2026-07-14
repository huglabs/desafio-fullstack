import { api } from "../configs/api";
import { API_ROUTES } from "../configs/routes";
import type { Room , CreateRoomPayload} from "../types/Room";

export async function listRoomService(): Promise<Room[]> {
    const response = await api.get(API_ROUTES.ROOMS.LIST);
    return response.data.message ?? response.data.data ?? response.data;
}

export async function createRoomService(payload: CreateRoomPayload): Promise<Room> {
    const response = await api.post(API_ROUTES.ROOMS.CREATE, payload);
    return response.data.room ?? response.data.data ?? response.data; 
}

export async function joinRoomService(roomId: number): Promise<void> {
    await api.post(API_ROUTES.ROOMS.JOIN(roomId));
}