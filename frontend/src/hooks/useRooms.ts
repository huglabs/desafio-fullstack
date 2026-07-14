import { useState, useEffect, useCallback } from "react";
import { listRoomService, createRoomService, joinRoomService } from "../services/RoomService";
import type { Room, CreateRoomPayload } from "../types/Room";

export function useRooms(){
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const listRooms = useCallback(async () => {
        try{
            setLoading(true);
            const dataList = await listRoomService();
            setRooms(dataList);
        }catch(err){
            setError("Error ao carregar as Salas");
            throw err;
        } finally {
            setLoading(false);
        }
    },[]);

    async function createRoom(payload: CreateRoomPayload) {
        try{
            setLoading(true);
            const newRoom = await createRoomService(payload);
            setRooms((prev)=> [...prev, newRoom]);
            return newRoom;
        } catch(err){
            setError("Error ao criar sala")
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function joinRoom(roomId: number) {
        try{
            setLoading(true);
            await joinRoomService(roomId);
        }catch(err){
            setError("Erro ao entrar na sala")
            throw err;
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        listRooms();
    },[listRooms]);

    return {rooms, loading, error, listRooms, createRoom, joinRoom}
}