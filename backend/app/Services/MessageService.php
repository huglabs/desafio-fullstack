<?php

namespace App\Services;

use App\Models\Message;
use App\Repositories\MessageRepository;
use App\Repositories\RoomRepository;
use Illuminate\Validation\ValidationException;

class MessageService {

    public function __construct(
        private MessageRepository $messageRepository,
        private RoomRepository $roomRepository,
    ) {}

    public function sendMenssage(int $roomId, int $userId, string $body): Message {
        $room = $this->roomRepository->findById($roomId);
        
        if(!$room){
            throw ValidationException::withMessage([
                'room' => ['Sala não encontrada'],
            ]);
        }

        if (! $this->roomRepository->isMember($room, $userId)){
            throw ValidationException::withMessages([
                'room' => ['Voce precisa entrar na sala antes de enviar mensagem '],
            ]);
        }

        $message = $this->messageRepository->createMessage([
            'room_id' => $roomId,
            'user_id' => $userId,
            'body' => $body,
        ]);

        return $message->load('user');
    }

    public function historyMessage(int $roomId, int $perPage = 20){
        return $this->messageRepository->messageForRoom($roomId, $perPage);
    }

}
