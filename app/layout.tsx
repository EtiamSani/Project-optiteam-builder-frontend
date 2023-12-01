import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'




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
      <body className='min-h-screen font-poppins'>
        <Navbar/>
        {children}
        </body>
    </html>
  )
}
