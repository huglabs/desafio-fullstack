import { Hash } from "lucide-react";
import type { ChatHeaderProps } from "../types/Message";

export function ChatHeader({ roomName }: ChatHeaderProps) {
    return (
        <header className="h-16 pl-16 pr-4 md:px-4 flex items-center justify-between border-b border-border-input bg-bg-page">
            <div className="flex items-center gap-1.5">
                <Hash size={18} className="text-text-secondary" />
                <span className="font-semibold text-text-primary">
                    {roomName}
                </span>
            </div>
        </header>
    );
}