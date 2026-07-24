import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AuthPage } from '@/features/auth/pages/AuthPage'
import { ProfilePage } from '@/features/auth/pages/ProfilePage'
import { DashboardPage } from '@/features/home/pages/DashboardPage'
import { UrlDetailsPage } from '@/features/urls/pages/UrlDetailsPage'
import { UrlsPage } from '@/features/urls/pages/UrlsPage'
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout'
import { GuestRoute, ProtectedRoute } from '@/shared/components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />

        <Route element={<GuestRoute />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/urls" element={<UrlsPage />} />
            <Route path="/urls/:urlId" element={<UrlDetailsPage />} />
            <Route path="/me" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
