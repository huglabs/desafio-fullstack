import { api } from "../configs/api";
import { API_ROUTES } from "../configs/routes";
import type { Message, CreateMessagePayload } from "../types/Message";
import type { PaginatedMessages } from "../types/Message";

export async function listMessagesService(roomId: number, page: number = 1): Promise<PaginatedMessages> {
    const response = await api.get(API_ROUTES.MESSAGES.LIST(roomId), {
        params: { page },
    });
    const data = response.data.data ?? response.data.message ?? response.data;
    const meta = response.data.meta;
    return {
        messages: [...data].reverse(),
        currentPage: meta?.current_page ?? 1,
        lastPage: meta?.last_page ?? 1,
    };
}

export async function createMessageService(roomId: number, payload: CreateMessagePayload): Promise<Message> {
    const response = await api.post(API_ROUTES.MESSAGES.CREATE(roomId), payload);
    return response.data.message ?? response.data.data ?? response.data;
}