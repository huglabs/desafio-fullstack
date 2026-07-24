<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Link expirado — EncurtadorLinks</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #f3f7f4;
            --fg: #1a2e24;
            --muted: #5a6b60;
            --primary: #2d7a4f;
            --card: rgba(255, 255, 255, 0.86);
            --border: #d5e3da;
            --glow: rgba(45, 122, 79, 0.18);
            --warn: #b45309;
            --warn-soft: #fff7ed;
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            font-family: "DM Sans", system-ui, sans-serif;
            color: var(--fg);
            background:
                radial-gradient(ellipse 80% 55% at 10% -10%, var(--glow), transparent 55%),
                radial-gradient(ellipse 70% 50% at 100% 0%, rgba(45, 122, 79, 0.12), transparent 50%),
                radial-gradient(ellipse 60% 40% at 50% 110%, var(--glow), transparent 55%),
                var(--bg);
            overflow: hidden;
        }

        .grid {
            position: fixed;
            inset: 0;
            pointer-events: none;
            background-image:
                linear-gradient(to right, rgba(213, 227, 218, 0.55) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(213, 227, 218, 0.55) 1px, transparent 1px);
            background-size: 48px 48px;
            mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%);
            opacity: 0.6;
        }

        .shell {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 26rem;
            text-align: center;
            animation: fade-up 0.55s ease-out both;
        }

        .brand {
            font-family: Syne, system-ui, sans-serif;
            font-weight: 800;
            font-size: 1.125rem;
            letter-spacing: -0.02em;
            margin-bottom: 1.75rem;
        }

        .brand span { color: var(--primary); }

        .card {
            padding: 2.25rem 1.75rem;
            border-radius: 0.875rem;
            background: var(--card);
            border: 1px solid rgba(213, 227, 218, 0.7);
            box-shadow: 0 20px 60px -30px rgba(30, 80, 50, 0.35);
            backdrop-filter: blur(16px);
        }

        .icon-wrap {
            width: 4.5rem;
            height: 4.5rem;
            margin: 0 auto 1.25rem;
            border-radius: 1.25rem;
            display: grid;
            place-items: center;
            background: var(--warn-soft);
            color: var(--warn);
            animation: pulse-soft 2.4s ease-in-out infinite;
        }

        .icon-wrap svg {
            width: 2rem;
            height: 2rem;
        }

        h1 {
            margin: 0 0 0.5rem;
            font-family: Syne, system-ui, sans-serif;
            font-size: 1.75rem;
            font-weight: 700;
            letter-spacing: -0.03em;
            line-height: 1.15;
        }

        .lead {
            margin: 0 auto 1.5rem;
            max-width: 20rem;
            color: var(--muted);
            font-size: 0.975rem;
            line-height: 1.5;
        }

        .meta {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.875rem;
            border-radius: 999px;
            background: rgba(243, 247, 244, 0.9);
            border: 1px solid var(--border);
            color: var(--muted);
            font-size: 0.8125rem;
            margin-bottom: 1.5rem;
        }

        .meta code {
            font-family: ui-monospace, monospace;
            color: var(--fg);
            font-weight: 600;
        }

        .actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
            padding: 0.8rem 1rem;
            border-radius: 0.75rem;
            font-family: inherit;
            font-size: 0.95rem;
            font-weight: 600;
            text-decoration: none;
            transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }

        .btn:hover { transform: translateY(-1px); }

        .btn-primary {
            background: var(--primary);
            color: #fff;
            border: 0;
            box-shadow: 0 10px 24px -14px rgba(45, 122, 79, 0.8);
        }

        .btn-primary:hover {
            background: #256b44;
        }

        .btn-ghost {
            background: transparent;
            color: var(--muted);
            border: 1px solid var(--border);
        }

        .btn-ghost:hover {
            background: rgba(255, 255, 255, 0.7);
            color: var(--fg);
        }

        .footnote {
            margin: 1.25rem 0 0;
            font-size: 0.75rem;
            color: var(--muted);
        }

        @keyframes fade-up {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-soft {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.04); }
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --bg: #141f19;
                --fg: #f0f5f2;
                --muted: #9aada2;
                --primary: #4caf78;
                --card: rgba(28, 40, 33, 0.82);
                --border: #2f4137;
                --glow: rgba(76, 175, 120, 0.16);
                --warn: #fb923c;
                --warn-soft: rgba(251, 146, 60, 0.12);
            }

            .grid { opacity: 0.25; }

            .meta {
                background: rgba(20, 31, 25, 0.8);
            }

            .btn-ghost:hover {
                background: rgba(47, 65, 55, 0.6);
            }
        }
    </style>
</head>
<body>
    <div class="grid" aria-hidden="true"></div>

    <div class="shell">
        <p class="brand">Encurtador<span>Links</span></p>

        <div class="card">
            <div class="icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                </svg>
            </div>

            <h1>Este link expirou</h1>
            <p class="lead">
                O prazo de validade deste endereço curto acabou.
                Peça um novo link a quem compartilhou, ou acesse o encurtador.
            </p>

            @if (!empty($slug))
                <div class="meta">
                    <span>Slug</span>
                    <code>{{ $slug }}</code>
                </div>
            @endif

            @if (!empty($expiresAt))
                <div class="meta" style="margin-top: -0.75rem;">
                    <span>Expirou em</span>
                    <code>{{ $expiresAt }}</code>
                </div>
            @endif

            <div class="actions">
                @if (!empty($frontendUrl))
                    <a class="btn btn-primary" href="{{ $frontendUrl }}">Ir para o encurtador</a>
                @endif
                <a class="btn btn-ghost" href="javascript:history.back()">Voltar</a>
            </div>

            <p class="footnote">Código 410 · Gone</p>
        </div>
    </div>
</body>
</html>
