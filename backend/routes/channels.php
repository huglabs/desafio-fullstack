<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Autorização para os Presence Channels das salas
// O Reverb vai rodar essa função para cada usuário que tentar se conectar ao canal de uma sala
Broadcast::channel('room.{roomId}', function ($user, $roomId) {
    // Para um Presence Channel, retornamos um array com os dados do usuário (que aparecerão como "online")
    // Se retornássemos null ou false, o acesso seria negado.
    return ['id' => $user->id, 'name' => $user->name];
});