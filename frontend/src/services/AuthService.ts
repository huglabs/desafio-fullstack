import { api } from "../configs/api";
import { API_ROUTES } from "../configs/routes";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../types/Auth";

export async function loginUserService(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post(API_ROUTES.AUTH.LOGIN, payload);
    return response.data;
}
export async function registerUserService(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await api.post(API_ROUTES.AUTH.REGISTER, payload);
    return response.data;
}

export async function logoutUserService(): Promise<void> {
    await api.post(API_ROUTES.AUTH.LOGOUT);
}