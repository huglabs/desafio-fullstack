import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("Error, Auth deve ser dentro do provider")
    }
    return context;
}