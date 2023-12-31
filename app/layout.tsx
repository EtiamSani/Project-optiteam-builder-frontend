import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'



export const metadata: Metadata = {
  title: 'OptiTeam Builder',
  description: 'Create a powerful team',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='min-h-screen font-poppins'>{children}</body>
    </html>
  )
}
