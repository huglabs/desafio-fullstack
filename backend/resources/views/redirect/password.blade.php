<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Link protegido</title>
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: system-ui, sans-serif;
            background: #f4f7f5;
            color: #1a2e24;
        }
        .card {
            width: 100%;
            max-width: 24rem;
            padding: 2rem;
            border-radius: 0.875rem;
            background: #fff;
            border: 1px solid #d8e5dc;
            box-shadow: 0 20px 60px -30px rgba(30, 80, 50, 0.25);
        }
        h1 { margin: 0 0 0.5rem; font-size: 1.25rem; }
        p { margin: 0 0 1.5rem; color: #5a6b60; font-size: 0.95rem; }
        label { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 600; }
        input {
            width: 100%;
            padding: 0.75rem 0.875rem;
            border: 1px solid #d8e5dc;
            border-radius: 0.75rem;
            font-size: 1rem;
        }
        button {
            margin-top: 1rem;
            width: 100%;
            padding: 0.75rem;
            border: 0;
            border-radius: 0.75rem;
            background: #2d7a4f;
            color: #fff;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
        }
        .error { color: #b42318; font-size: 0.875rem; margin-bottom: 1rem; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Link protegido</h1>
        <p>Informe a senha para continuar.</p>

        @if ($error)
            <p class="error">{{ $error }}</p>
        @endif

        <form method="POST" action="/{{ $slug }}">
            @csrf
            <label for="password">Senha</label>
            <input id="password" type="password" name="password" required autofocus>
            <button type="submit">Acessar link</button>
        </form>
    </div>
</body>
</html>
