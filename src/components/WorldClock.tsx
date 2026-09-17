'use client'

import { useEffect, useState } from 'react'
import { Clock3, Globe2 } from 'lucide-react'

type TimeZone = {
  city: string
  zone: string
  label: string
}

const timeZones: TimeZone[] = [
  { city: 'กรุงเทพฯ', zone: 'Asia/Bangkok', label: 'ประเทศไทย' },
  { city: 'ลอนดอน', zone: 'Europe/London', label: 'สหราชอาณาจักร' },
  { city: 'นิวยอร์ก', zone: 'America/New_York', label: 'สหรัฐอเมริกา' },
  { city: 'โตเกียว', zone: 'Asia/Tokyo', label: 'ญี่ปุ่น' },
]

const formatTime = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat('th-TH', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)

const formatDate = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat('th-TH', {
    timeZone,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)

export default function WorldClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  if (!now) return null

  return (
    <section className="fixed bottom-5 right-5 z-40 w-[min(24rem,calc(100vw-2.5rem))] rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur" aria-label="นาฬิกาโลก">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-600"><Clock3 size={18} /></div>
          <div><h2 className="text-sm font-bold text-slate-900">เวลาปัจจุบัน</h2><p className="text-xs text-slate-500">นาฬิกาโลก</p></div>
        </div>
        <Globe2 size={18} className="text-slate-400" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {timeZones.map(({ city, zone, label }) => (
          <div key={zone} className="rounded-xl bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold text-slate-700">{city}</p><span className="text-[10px] text-slate-400">{label}</span></div>
            <p className="mt-1 font-mono text-lg font-bold tracking-tight text-slate-900">{formatTime(now, zone)}</p>
            <p className="text-[10px] text-slate-500">{formatDate(now, zone)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
