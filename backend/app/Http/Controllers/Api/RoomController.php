<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\RoomRequest;
use App\Http\Resources\RoomResource;
use App\Services\RoomService;


class RoomController extends Controller {

    public function __construct(private RoomService $roomService) {}

    public function listRoom(){
        $rooms = $this->roomService->listRoom();

        return RoomResource::collection($rooms);
    }

    public function createRoom(RoomRequest $request){
        $room = $this->roomService->create($request->validated(), $request->user()->id);
        
        return response()->json([
            'room' => new RoomResource($room),
        ], 201);
    }

    public function joinRoom(Request $request, int $id) {
        $room = $this->roomService->join($id, $request->user()->id);

        return response()->json([
            'room' => new RoomResource($room),
        ]);
    }
}
