'use client'

import * as React from 'react'
import { Moon, Sun, Laptop } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light') // system → light
  }

  const icon =
    theme === 'light' ? (
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
    ) : theme === 'dark' ? (
      <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
    ) : (
      <Laptop className="h-[1.2rem] w-[1.2rem] transition-all" />
    )

  return (
    <Button variant="outline" size="icon" onClick={cycleTheme} className="relative">
      {icon}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
