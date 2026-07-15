# 💬 Chat em Tempo Real — Laravel Reverb + React

Sistema de chat em tempo real desenvolvido como desafio técnico, utilizando **Laravel Reverb** para comunicação via WebSocket, **Laravel Sanctum** para autenticação e **React + TypeScript** no frontend.

---

# 🧱 Tecnologias

## Backend

- Laravel 12
- Laravel Sanctum
- Laravel Reverb
- PostgreSQL

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Laravel Echo
- Pusher JS

## Infraestrutura

- Docker
- Docker Compose

---

# 📁 Estrutura do Projeto

```text
desafio-fullstack/
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── database/
│   └── ...
│
├── frontend/
│   ├── src/
│   └── ...
│
├── docker/
│   ├── php/
│   └── node/
│
└── docker-compose.yml
```

---

# 🚀 Como executar

## Pré-requisitos

- Docker
- Docker Compose

---

## 1. Clone o projeto

```bash
git clone <url-do-repositorio>
cd desafio-fullstack
```

---

## 2. Configure os arquivos .env

### Backend

```bash
cp backend/.env.example backend/.env
```

Configure as variáveis do backend (Mesmas do env.example)

### Frontend

```bash
cp frontend/.env.example frontend/.env
```

Configure as variáveis:

  São as mesmas do env.example

---

## 3. Suba os containers

```bash
docker compose up --build
```

Serão iniciados automaticamente os seguintes serviços:

- Laravel API
- React
- PostgreSQL
- Laravel Reverb
- Queue Worker

---

## 4. Execute as migrations

```bash
docker compose exec app php artisan migrate
```

Caso deseje popular o banco:

```bash
docker compose exec app php artisan db:seed
```

---

# Endereços da aplicação

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:8000
```

WebSocket (Reverb)

```
ws://localhost:8080
```

---

# Principais Endpoints

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| POST | `/api/register` | Registro de usuário |
| POST | `/api/login` | Login |
| POST | `/api/logout` | Logout |
| GET | `/api/rooms` | Lista salas |
| POST | `/api/rooms` | Cria sala |
| POST | `/api/rooms/{id}/join` | Entrar em uma sala |
| GET | `/api/rooms/{id}/messages` | Histórico paginado |
| POST | `/api/rooms/{id}/messages` | Envia mensagem |

A autenticação é realizada através do header:

```http
Authorization: Bearer {token}
```

Broadcast:

```
Canal: room.{roomId}

Evento: message.sent
```

---

# 📂 Modelagem

<img width="2575" height="1634" alt="infra papai" src="https://github.com/user-attachments/assets/f59b19da-6cd3-427e-a411-06ec1de5dcd5" />


# ⚖️ Trade-offs

- Autenticação via Bearer token (Sanctum SPA token), não cookies de sessão. Mais simples de configurar entre domínios/portas diferentes em dev.
- Paginação do histórico de mensagens: 20 por página, ordenadas das mais recentes para as mais antigas, com um botão "carregar mensagens antigas" no topo do chat (em vez de scroll infinito automático), tentei implementar o scroll infinito mas acabei tendo problemas e voltei atras.
- Os eventos de broadcast (ShouldBroadcast) são despachados via fila
---

# Limitações Conhecidas

- A autorização dos canais privados ainda permite que qualquer usuário autenticado acesse um canal privado. Em uma evolução do projeto, a autorização deve validar se o usuário pertence à sala antes de permitir a inscrição no canal.
- Não foram implementados os diferenciais opcionais propostos (Presence Channels, indicador de digitação, mensagens privadas, upload de imagens, mensagens lidas e testes automatizados), pensei em implementar mas acabei passando por alguns problemas e não consegui implementar os mesmo .

---

# Funcionalidades Implementadas

- Cadastro de usuários
- Login e Logout
- Autenticação via Sanctum
- Criação de salas
- Listagem de salas
- Entrada em salas
- Histórico paginado de mensagens
- Envio de mensagens
- Atualização das mensagens em tempo real utilizando Laravel Reverb
- Comunicação entre múltiplos clientes via WebSocket
