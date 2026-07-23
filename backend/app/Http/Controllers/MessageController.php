<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Message;
use App\Events\MessageSent;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // Lista o histórico paginado de mensagens de uma sala
    public function index(Room $room)
    {
        $messages = $room->messages()
            ->with('user:id,name') // Traz o nome do usuário junto com a mensagem
            ->latest() // Mais recentes primeiro
            ->paginate(50); // Paginação

        return response()->json($messages);
    }

    // Salva uma nova mensagem e dispara o broadcast
    public function store(Request $request, Room $room)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:2000',
        ]);

        $message = $room->messages()->create([
            'user_id' => $request->user()->id,
            'content' => $validated['content'],
        ]);

        // Carrega a relação do usuário para enviar no evento
        $message->load('user');

        // Dispara o evento para o Laravel Reverb
        broadcast(new MessageSent($message));

        return response()->json($message, 201);
    }
}