import { Hash } from "lucide-react";
import type { RoomItemProps } from "../../types/Room";

export function RoomItem({ room, active, onClick }: RoomItemProps) {
    const baseClasses = "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all cursor-pointer group";
    return (
        <button
            onClick={onClick}
            className={`${baseClasses}
                ${active
                        ? "bg-bg-tab-active text-text-primary font-semibold"
                        : "text-text-secondary hover:bg-bg-card/40 hover:text-text-primary"}`}
        >
            <div className="flex items-center gap-2">
                <Hash
                    className={`w-4 h-4 ${ active ? "text-primary" : "text-text-secondary"}`}
                />
                <span className="truncate">
                    {room.name}
                </span>
            </div>
        </button>
    );
}