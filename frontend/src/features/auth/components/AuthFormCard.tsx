import { LoginForm } from '@/features/auth/components/LoginForm'
import { RegisterForm } from '@/features/auth/components/RegisterForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'

export function AuthFormCard() {
  return (
    <Card className="animate-fade-up-delay border-border/70 bg-card/80 shadow-[0_20px_60px_-30px_oklch(0.45_0.1_150_/_0.45)] backdrop-blur-xl dark:shadow-[0_20px_60px_-30px_oklch(0.2_0.04_220_/_0.35)]">
      <CardHeader className="space-y-1 pb-4 text-center">
        <CardTitle className="font-display text-xl">Bem-vindo</CardTitle>
        <CardDescription>Entre na sua conta ou crie uma nova em segundos</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="gap-4">
          <TabsList className="bg-muted/80 grid h-11 w-full grid-cols-2 rounded-xl p-1">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg data-[state=active]:shadow-sm"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg data-[state=active]:shadow-sm"
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
  )
}
