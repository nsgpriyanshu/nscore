import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'

export default function OverviewLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en">{children}</html>
}
