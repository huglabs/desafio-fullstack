<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    // Recebemos a mensagem recém-criada
    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    // Define em qual canal esta mensagem será transmitida
    public function broadcastOn(): array
    {
        // Canal específico para a sala, ex: 'room.1', 'room.2'
        return [
            new PresenceChannel('room.' . $this->message->room_id),
        ];
    }

    // Define os dados exatos que o frontend vai receber
    public function broadcastWith(): array
    {
        return [
            'id' => $this->message->id,
            'content' => $this->message->content,
            'room_id' => $this->message->room_id,
            'user' => [
                'id' => $this->message->user->id,
                'name' => $this->message->user->name,
            ],
            'created_at' => $this->message->created_at->toIso8601String(),
        ];
    }
}