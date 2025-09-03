import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Text Mining Tutorial in JavaScript',
  description: 'Interactive tutorial for learning text mining and analysis techniques',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}