import { LoginForm } from '@/features/auth/components/LoginForm'
import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'

export function AuthPage() {
  return (
    <div className="auth-shell relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-10">
      <div className="auth-grid pointer-events-none absolute inset-0 opacity-60 dark:opacity-30" />

      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8">
        <header className="animate-fade-up space-y-3 text-center">
          <p className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Encurtador<span className="text-primary"> de Links</span>
          </p>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground sm:text-base">
            Encurte links e acompanhe acessos com uma experiência limpa e rápida.
          </p>
        </header>

        <Card className="animate-fade-up-delay border-border/70 bg-card/80 shadow-[0_20px_60px_-30px_oklch(0.45_0.1_150_/_0.45)] backdrop-blur-xl">
          <CardHeader className="space-y-1 pb-4 text-center">
            <CardTitle className="font-display text-xl">Bem-vindo</CardTitle>
            <CardDescription>Entre na sua conta ou crie uma nova em segundos</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="gap-4">
              <TabsList className="grid h-11 w-full grid-cols-2 rounded-xl bg-muted/80 p-1">
                <TabsTrigger
                  value="login"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                >
                  Registro
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="mt-5 outline-none">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register" className="mt-5 outline-none">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
