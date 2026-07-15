💬 Chat em Tempo Real — Laravel Reverb + React

Sistema de chat em tempo real com salas, mensagens e WebSocket via Laravel Reverb.

🧱 Stack


Backend: Laravel + Sanctum (auth) + Reverb (WebSocket)
Frontend: React + TypeScript + Vite + Tailwind + Laravel Echo (pusher-js como client WS)



🚀 Como rodar localmente

Pré-requisitos


PHP 8.2+
Composer
Node 18+
SQLite (ou outro banco de sua preferência)


1. Backend

bashcd back
composer install
cp .env.example .env
php artisan key:generate

Configure o .env (principais chaves):

envAPP_URL=http://localhost:8000

DB_CONNECTION=sqlite
# certifique-se de que DB_DATABASE aponta para um arquivo, e não para :memory:
# (deixe a linha comentada para usar database/database.sqlite por padrão)

BROADCAST_CONNECTION=reverb

REVERB_APP_ID=local
REVERB_APP_KEY=local-key
REVERB_APP_SECRET=local-secret
REVERB_HOST=localhost
REVERB_PORT=8080
REVERB_SCHEME=http

Crie o banco e rode as migrations:

bashtouch database/database.sqlite
php artisan migrate

Suba os 3 processos necessários (em terminais separados):

bashphp artisan serve            # API em http://localhost:8000
php artisan reverb:start     # WebSocket em ws://localhost:8080
php artisan queue:work       # processa os eventos de broadcast (se QUEUE_CONNECTION != sync)

2. Frontend

bashcd front
npm install
cp .env.example .env

Configure o .env do front:

envVITE_API_URL=http://localhost:8000/api
VITE_APP_URL=http://localhost:8000

VITE_REVERB_APP_KEY=local-key
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080

bashnpm run dev

Acesse http://localhost:5173.


📡 Endpoints principais

MétodoRotaDescriçãoPOST/api/registerCria usuárioPOST/api/loginLogin, retorna token SanctumPOST/api/logoutRevoga o token (autenticado)GET/api/roomsLista salasPOST/api/roomsCria salaPOST/api/rooms/{id}/joinEntra em uma salaGET/api/rooms/{id}/messagesHistórico paginado de mensagensPOST/api/rooms/{id}/messagesEnvia mensagem (dispara broadcast)

Autenticação via header Authorization: Bearer {token}.

Broadcast: canal privado room.{roomId}, evento message.sent.


⚖️ Trade-offs e decisões


Autenticação via Bearer token (Sanctum SPA token), não cookies de sessão. Mais simples de configurar entre domínios/portas diferentes em dev, mas abre mão da proteção extra de cookies httpOnly — para produção, cookies + CSRF seriam mais indicados.
Paginação do histórico de mensagens: 20 por página, ordenadas das mais recentes para as mais antigas, com um botão "carregar mensagens antigas" no topo do chat (em vez de scroll infinito automático). Optei pela abordagem mais simples e previsível — scroll infinito com preservação exata de posição adiciona complexidade que não parecia justificar o ganho de UX para o escopo do desafio.
QUEUE_CONNECTION: os eventos de broadcast (ShouldBroadcast) são despachados via fila. Para rodar localmente sem subir um worker, é possível usar QUEUE_CONNECTION=sync no .env, o que processa o broadcast de forma síncrona no mesmo request.
Não implementei nenhum dos diferenciais opcionais (typing indicator, presence channel, DM, upload de imagem, mensagens lidas, testes automatizados) para focar em entregar o fluxo obrigatório completo e testado.


⚠️ Limitações conhecidas


A autorização do canal privado de broadcast (routes/channels.php) atualmente libera qualquer usuário autenticado a ouvir qualquer sala, sem checar se ele é de fato membro dela. Em uma próxima iteração, isso seria restrito checando RoomRepository::isMember.
Não há testes automatizados.