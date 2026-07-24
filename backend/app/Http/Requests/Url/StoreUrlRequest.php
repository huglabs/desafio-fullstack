<?php

namespace App\Http\Requests\Url;

use Illuminate\Foundation\Http\FormRequest;

class StoreUrlRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'original_url' => ['required', 'url', 'max:2048'],
            'expires_at' => ['nullable', 'date', 'after:now'],
            'password' => ['nullable', 'string', 'min:4', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'original_url.required' => 'Informe a URL original.',
            'original_url.url' => 'A URL original deve ser válida.',
            'expires_at.after' => 'A data de expiração deve ser futura.',
            'password.min' => 'A senha deve ter pelo menos 4 caracteres.',
        ];
    }
}
