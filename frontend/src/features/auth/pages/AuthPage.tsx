import { AuthBrandHeader } from '@/features/auth/components/AuthBrandHeader'
import { AuthFormCard } from '@/features/auth/components/AuthFormCard'
import { AppShell } from '@/shared/components/AppShell'

export function AuthPage() {
  return (
    <AppShell>
      <div className="relative z-10 w-full max-w-md space-y-8">
        <AuthBrandHeader />
        <AuthFormCard />
      </div>
    </AppShell>
  )
}
