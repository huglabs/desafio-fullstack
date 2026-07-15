import { useEffect, useRef } from "react";
import type { MessagesListProps } from "../types/Message";

export function MessagesList({ messages, currentUserId, hasMore, loadingMore, onLoadMore }: MessagesListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);
    const isLoadingOld = useRef(false);

    useEffect(() => {
        if (isLoadingOld.current) {
            isLoadingOld.current = false;
            return;
        }
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    function handleLoadMore() {
        isLoadingOld.current = true;
        onLoadMore?.();
    }

    return (
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
            {hasMore && (
                <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="mx-auto text-xs text-indigo-600 hover:underline py-2 disabled:opacity-50"
                >
                    {loadingMore ? "Carregando..." : "Carregar mensagens antigas"}
                </button>
            )}

            {messages.map((message) => {
                const isOwn = message.user.id === currentUserId;

                return (
                    <div key={message.id} className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-sm font-semibold text-text-primary">
                                {isOwn ? "Você" : message.user.name}
                            </span>
                            <span className="text-xs text-text-secondary">
                                {new Date(message.created_at).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>

                        <div
                            className={`max-w-md px-3 py-2 rounded-lg text-sm ${
                                isOwn ? "bg-indigo-600 text-white" : "bg-bg-tab-active text-text-primary"
                            }`}
                        >
                            {message.body}
                        </div>
                    </div>
                );
            })}
            <div ref={bottomRef} />
        </div>
    );
}