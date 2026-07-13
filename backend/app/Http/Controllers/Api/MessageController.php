<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\MessageService;
use App\Http\Resources\MessageResource;
use App\Http\Requests\MessageRequest;

class MessageController extends Controller {

    public function __construct(private MessageService $messageService){}

    public function sendMessage(MessageRequest $messageRequest, int $roomId){
        $message = $this->messageService->sendMenssage($roomId, $messageRequest->user()->id, $messageRequest->validated()['body']);

        return response()->json([
            'message' => new MessageResource($message),
        ], 201);
    }

    public function listMessage(int $roomId){
        $message = $this->messageService->historyMessage($roomId);

        return MessageResource::collection($message);
    }

}
