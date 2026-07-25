<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'broadcasting/auth'],

    'allowed_methods' => ['*'],

    // Adicione a URL do seu Netlify aqui (ou '*' durante a fase de testes/banca)
    'allowed_origins' => [
        'https://desafio-fullstack.netlify.app',
        'http://localhost:5173',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];