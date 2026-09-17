import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CondoCare | ระบบนิติบุคคลอาคารชุด',
  description: 'ระบบบริหารจัดการนิติบุคคลอาคารชุด',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  )
}
