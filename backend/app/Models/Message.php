<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['room_id', 'user_id', 'content'])]
class Message extends Model
{
    //A mensagem pertence a um usuário
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // A mensagem pertence a uma sala
    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
