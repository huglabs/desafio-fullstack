<?php

namespace App\Services;

use App\Models\Room;
use App\Repositories\RoomRepository;
use Illuminate\Validation\ValidationException;


class RoomService {

    public function __construct(private RoomRepository $roomRepository) {}

    public function listRoom(int $perPage = 15){
        return $this->roomRepository->paginated($perPage);
    }

    public function create(array $data, int $userId): Room {
        $room = $this->roomRepository->create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'created_by' => $userId,
        ]);

        $this->roomRepository->addMember($room, $userId);

        return $room;
    }

    public function join(int $roomId, int $userId){
        $room = $this->roomRepository->findById($roomId);

        if(!$room){
            throw ValidationException::withMessages([
                'room' => ['Sala não encontrada']
            ]);
        }

        if($this->roomRepository->isMember($room, $userId)){
            return $room;
        }
        
        $this->roomRepository->addMember($room, $userId);

        return $room;
    }

}
