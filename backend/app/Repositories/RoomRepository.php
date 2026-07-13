<?php

namespace App\Repositories;

use App\Models\Room;

class RoomRepository
{
    public function paginated(int $numPages){
        return Room::with('creator')->latest()->paginate($numPages);
    }

    public function findById(int $id): ?Room {
        return Room::find($id);
    }

    public function create(array $data): Room {
        return Room::create($data);
    }

    public function isMember(Room $room, int $userId): bool {
        return $room->users()->where('user_id', $userId)->exists();
    }

    public function addMember(Room $room, int $userId): void {
        $room->users()->attach($userId, ['joined_at' => now()]);
    }
}
