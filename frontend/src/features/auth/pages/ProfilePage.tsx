import { Plus } from 'lucide-react'
import { useState } from 'react'

import { useMe } from '@/features/auth/hooks/useAuth'
import { ProfileField, ProfileFieldSkeleton } from '@/features/auth/components/ProfileField'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { PageHeader } from '@/shared/components/PageHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'

export function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const { isLoading, isFetching } = useMe()
  const loading = isLoading || isFetching

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <PageHeader
        title="Meu perfil"
        description="Dados da sua conta autenticada."
      />

      <Card className="border-border/70 bg-card/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="font-display text-lg">Informações</CardTitle>
          <CardDescription>Dados da sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <>
              <ProfileFieldSkeleton />
              <ProfileFieldSkeleton />
              <ProfileFieldSkeleton />
            </>
          ) : (
            <>
              <ProfileField label="ID" value={String(user?.id ?? '—')} />
              <ProfileField label="Nome" value={user?.name ?? '—'} />
              <ProfileField label="E-mail" value={user?.email ?? '—'} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
