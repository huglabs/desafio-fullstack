import { Eye, EyeOff } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils'

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<'input'>, 'type'>
>(({ className, ...props }, ref) => {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="relative">
      <Input
        type={visible ? 'text' : 'password'}
        className={cn('pr-11', className)}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1 h-9 w-9 -translate-y-1/2 hover:bg-transparent"
        onClick={() => setVisible((prev) => !prev)}
        aria-label={visible ? 'Ocultar senha' : 'Exibir senha'}
        tabIndex={-1}
      >
        {visible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  )
})
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
