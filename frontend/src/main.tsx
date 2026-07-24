import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App'
import { Toaster } from '@/shared/components/ui/sonner'
import { initTheme } from '@/shared/stores/themeStore'
import '@/index.css'

initTheme()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster richColors closeButton position="top-right" />
    </QueryClientProvider>
  </StrictMode>,
)
