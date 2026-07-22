export interface User {
  id: number
  name: string
  email: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface MeResponse {
  user: User
}
