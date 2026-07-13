<?php

namespace App\Repositories;

use App\Models\Message;

class MessageRepository {
    public function createMessage(array $data): Message {
        return Message::create($data);
    }

    public function messageForRoom(int $roomId, int $perPage){
        return Message::with('user')->where('room_id', $roomId)->latest()->paginate($perPage);
    }
}
