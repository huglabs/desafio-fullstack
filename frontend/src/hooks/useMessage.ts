import { useState, useEffect, useCallback, useRef } from "react";
import { listMessagesService, createMessageService } from "../services/MessageService";
import type { Message } from "../types/Message";
import { echo } from "../configs/echo";

export function useMessages(roomId: number | null) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState("");
    const pageRef = useRef(1);

    const fetchMessages = useCallback(async () => {
        if (!roomId) return;
        try {
            setLoading(true);
            const { messages: data, currentPage, lastPage } = await listMessagesService(roomId, 1);
            setMessages(data);
            pageRef.current = currentPage;
            setHasMore(currentPage < lastPage);
        } catch (err) {
            setError("Erro ao carregar mensagens");
            throw err;
        } finally {
            setLoading(false);
        }
    }, [roomId]);

    const loadMoreMessages = useCallback(async () => {
        if (!roomId || loadingMore || !hasMore) {
            return;
        }
        try {
            setLoadingMore(true);
            const nextPage = pageRef.current + 1;
            const { messages: older, currentPage, lastPage } = await listMessagesService(roomId, nextPage);
            setMessages((prev) => [...older, ...prev]); 
            pageRef.current = currentPage;
            setHasMore(currentPage < lastPage);
        } catch (err) {
            setError("Erro ao carregar mensagens antigas");
        } finally {
            setLoadingMore(false);
        }
    }, [roomId, loadingMore, hasMore]);

    async function sendMessage(body: string) {
        if (!roomId) return;
        try {
            const newMessage = await createMessageService(roomId, { body });
            setMessages((prev) => [...prev, newMessage]);
            return newMessage;
        } catch (err) {
            setError("Erro ao enviar mensagem");
            throw err;
        }
    }

    useEffect(() => {
        setMessages([]);
        pageRef.current = 1;
        setHasMore(false);
        fetchMessages();
    }, [fetchMessages]);

    useEffect(() => {
        if (!roomId) return;

        const channel = echo.private(`room.${roomId}`)
            .listen('.message.sent', (data: { message: Message }) => {
                setMessages((prev) => {
                    if (prev.some((m) => m.id === data.message.id)) {
                        return prev;
                    }
                    return [...prev, data.message];
                });
            });

        return () => {
            echo.leave(`room.${roomId}`);
        };
    }, [roomId]);

    return { messages, loading, loadingMore, hasMore, error, sendMessage, fetchMessages, loadMoreMessages };
}