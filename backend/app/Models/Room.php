<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'description'])]
class Room extends Model
{
    // Relacionamento: Uma sala tem muitas mensagens
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
