<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Message;
use App\Http\Resources\MessageResource;

class MessageSent implements ShouldBroadcast{

    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Message $message){}

    public function broadcastOn(): array {
        return [
            new PrivateChannel('room.'.$this->message->room_id),
        ];
    }
    public function broadcastAs(): string {
        return 'message.sent';
    }

    public function broadcastWith(): array {
        return [
            'message' => (new MessageResource($this->message))->resolve(request()),
        ];
    }
}
