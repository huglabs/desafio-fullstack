export const API_ROUTES = {
    
    AUTH_BROADCAST:{
        AUTH: "/broadcasting/auth",
    },  

    AUTH: {
        LOGIN: "/login",
        REGISTER: "/register",
        LOGOUT: "/logout",
    },

    ROOMS: {
        LIST: "/rooms",
        CREATE: "/rooms",
        JOIN: (roomId: number) => `/rooms/${roomId}/join`,
    },
    
    MESSAGES: {
        LIST: (roomId: number) => `/rooms/${roomId}/messages`,
        CREATE: (roomId: number) => `/rooms/${roomId}/messages`,
    },

} as const;