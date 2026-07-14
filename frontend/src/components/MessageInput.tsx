import { useState, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { IconButton } from "./ui/IconButton";
import type { MessageInputProps } from "../types/Message";

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
    const [value, setValue] = useState("");

    function handleSend() {
        const trimmed = value.trim();
        if (!trimmed) return;

        onSendMessage(trimmed);
        setValue("");
    }

    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <div className="border-t border-border-input p-4 bg-bg-page">
            <div className="flex items-end gap-2 bg-bg-tab-active rounded-lg px-3 py-2">
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    rows={1}
                    placeholder="Mensagem"
                    className="flex-1 bg-transparent resize-none outline-none text-sm text-text-primary placeholder:text-text-secondary max-h-32"
                />

                <IconButton
                    onClick={handleSend}
                    disabled={!value.trim() || disabled}
                    className="text-text-secondary hover:text-indigo-500 disabled:opacity-40"
                >
                    <Send size={16} />
                </IconButton>
            </div>
        </div>
    );
}