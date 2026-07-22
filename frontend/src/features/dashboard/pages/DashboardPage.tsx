import { useLogout, useMe } from '@/features/auth/hooks/useAuth'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'

export function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  const logout = useLogout()

  useMe()

  return (
    <div className="auth-shell relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-10">
      <div className="auth-grid pointer-events-none absolute inset-0 opacity-50 dark:opacity-25" />

      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <Card className="relative z-10 w-full max-w-lg border-border/70 bg-card/80 shadow-[0_20px_60px_-30px_oklch(0.45_0.1_150_/_0.45)] backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="font-display text-2xl">Dashboard</CardTitle>
          <CardDescription>
            Olá, {user?.name ?? 'usuário'}. Em breve você poderá gerenciar suas URLs aqui.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Módulo de URLs e analytics será implementado na próxima fase.
          </p>
          <Button
            variant="outline"
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
          >
            {logout.isPending ? 'Saindo...' : 'Sair'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
