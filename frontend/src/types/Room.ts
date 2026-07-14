export interface Room {
    id: number,
    name: string,
    description: string | null,
    created_by: number,
    created_name?: string,
    created_at: string,
}