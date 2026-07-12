<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model {

    protected $fillable = [
        'name', 
        'description',
        'created_by'
    ];

    public function creator(){
        return $this->belongsTo(User:: class, 'created_by');
    }

    public function users(){
        return $this->belongsToMany(User:: class, 'room_user')->withPivot('joined_at')->withTimestamps();
    }

    public function messages(){
        return $this->hasMany(Message:: class);
    }
}