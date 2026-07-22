import { Moon, Sun } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { useThemeStore } from '@/shared/stores/themeStore'

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
      className="border-border/70 bg-card/60 backdrop-blur-md transition-transform hover:scale-[1.03]"
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  )
}
