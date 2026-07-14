import { useState } from "react";
import { Plus, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { IconButton } from "./ui/IconButton";
import { RoomItem } from "./ui/RoomItem";

import type { RoomSidebarProps } from "../types/Room";

export function RoomSidebar({
    rooms,
    activeRoomId,
    onSelectRoom,
    onCreateRoomClick,
    onLogout,
}: RoomSidebarProps) {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    function handleSelectRoom(id: number) {
        onSelectRoom(id);
        setIsOpen(false);
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-4 left-4 z-[60] p-2 rounded-lg bg-bg-card border border-border-input text-text-primary shadow-lg"
            >
                <Menu size={20} />
            </button>
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                />
            )}
            <div
                className={`
                    w-60 h-screen bg-bg-card border-r border-border-input flex flex-col justify-between
                    fixed md:static top-0 left-0 z-40
                    transition-transform duration-200 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                <div>
                    <div className="h-16 px-4 flex items-center justify-between border-b border-border-input">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="md:hidden text-text-secondary hover:text-text-primary"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="px-4 mt-6 mb-2 flex items-center justify-between">
                        <span className="text-xs uppercase font-semibold tracking-wider text-text-secondary">
                            Salas
                        </span>
                        <IconButton
                            onClick={onCreateRoomClick}
                            className="text-text-secondary hover:text-text-primary hover:bg-bg-tab-active"
                        >
                            <Plus size={16} />
                        </IconButton>
                    </div>
                    <nav className="px-2 flex flex-col gap-1">
                        {rooms.map((room) => (
                            <RoomItem
                                key={room.id}
                                room={room}
                                active={room.id === activeRoomId}
                                onClick={() => handleSelectRoom(room.id)}
                            />
                        ))}
                    </nav>
                </div>

                <footer className="border-t border-border-input p-4 flex justify-between items-center">
                    <div>
                        <p className="text-sm font-semibold text-text-primary">
                            {user?.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                            {user?.email}
                        </p>
                    </div>

                    <IconButton
                        onClick={onLogout}
                        className="text-text-secondary hover:text-red-500 hover:bg-bg-tab-active"
                    >
                        <LogOut size={16} />
                    </IconButton>
                </footer>
            </div>
        </>
    );
}