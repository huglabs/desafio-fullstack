<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    // Lista todas as salas disponíveis
    public function index()
    {
        // Retornamos as salas ordenadas pelas mais recentes
        $rooms = Room::latest()->get();
        
        return response()->json($rooms);
    }

    // Cria uma nova sala
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:rooms,name',
            'description' => 'nullable|string|max:1000',
        ]);

        $room = Room::create($validated);

        return response()->json($room, 201);
    }
}
