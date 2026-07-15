import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import type { CreateRoomModalProps } from "../types/Room";

export function CreateRoomModal({ onClose, onCreate }: CreateRoomModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (loading) return;

        if (!name.trim()) {
            setError("Digite um nome para a sala");
            return;
        }

        try {
            setLoading(true);
            setError("");
            await onCreate(name.trim(), description.trim());
            onClose();
        } catch (err) {
            setError("Erro ao criar sala, tente novamente");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
            onClick={onClose}
        >
            <div
                className="bg-bg-card border border-border-input rounded-btn w-full max-w-sm p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-text-primary">Nova sala</h2>
                    <button
                        onClick={onClose}
                        className="text-text-secondary hover:text-text-primary"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input
                        label="Nome"
                        placeholder="Ex: Time de Suporte"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        label="Descrição (opcional)"
                        placeholder="Do que essa sala trata?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {error && (
                        <span className="text-xs text-text-error text-center font-medium">
                            {error}
                        </span>
                    )}

                    <Button type="submit" disabled={loading}>
                        {loading ? "Criando..." : "Criar sala"}
                    </Button>
                </form>
            </div>
        </div>
    );
}