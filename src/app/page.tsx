'use client'

import { useState } from 'react'
import {
  Bell, Building2, CalendarDays, ChevronDown, CircleDollarSign,
  ClipboardList, LayoutDashboard, Menu, Megaphone, Search, Settings,
  TrendingUp, UserRound, Wrench, X, ArrowUpRight, Clock3,
} from 'lucide-react'

const menu = [
  { label: 'ภาพรวม', icon: LayoutDashboard },
  { label: 'ห้องชุดและผู้พักอาศัย', icon: Building2 },
  { label: 'การเงินและเรียกเก็บ', icon: CircleDollarSign },
  { label: 'แจ้งซ่อม', icon: Wrench },
  { label: 'ประกาศ', icon: Megaphone },
  { label: 'การประชุม', icon: CalendarDays },
]

const activities = [
  { icon: CircleDollarSign, title: 'รับชำระค่าส่วนกลาง', detail: 'ห้อง A-1204 · คุณสมชาย ใจดี', time: 'วันนี้ 10:42 น.', color: 'text-emerald-600 bg-emerald-50' },
  { icon: Wrench, title: 'แจ้งซ่อมใหม่', detail: 'ห้อง B-0802 · ระบบน้ำรั่วซึม', time: 'วันนี้ 09:18 น.', color: 'text-orange-600 bg-orange-50' },
  { icon: UserRound, title: 'เพิ่มผู้พักอาศัย', detail: 'ห้อง A-0506 · คุณปวีณา รัตนกุล', time: 'เมื่อวาน 16:30 น.', color: 'text-blue-600 bg-blue-50' },
]

export default function Dashboard() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('ภาพรวม')
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <aside className={`${open ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-72 bg-[#101828] p-5 text-white transition-transform lg:translate-x-0`}>
        <div className="mb-10 flex items-center justify-between px-2"><div className="flex items-center gap-3"><div className="rounded-xl bg-blue-500 p-2"><Building2 size={22}/></div><div><p className="text-lg font-bold">CondoCare</p><p className="text-xs text-slate-400">Property management</p></div></div><button className="lg:hidden" onClick={() => setOpen(false)}><X /></button></div>
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">เมนูหลัก</p>
        <nav className="space-y-1">{menu.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActive(label); setOpen(false) }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${active === label ? 'bg-blue-600 font-semibold shadow-lg shadow-blue-900/30' : 'text-slate-300 hover:bg-white/10'}`}><Icon size={19}/>{label}</button>)}</nav>
        <div className="absolute bottom-5 left-5 right-5"><button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-white/10"><Settings size={19}/>ตั้งค่าระบบ</button></div>
      </aside>
      <main className="lg:ml-72">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur md:px-10"><div className="flex items-center gap-4"><button className="text-slate-600 lg:hidden" onClick={() => setOpen(true)}><Menu /></button><div><p className="text-sm text-slate-500">วันพฤหัสบดีที่ 17 กันยายน 2569</p><h1 className="text-xl font-bold text-slate-900 md:text-2xl">สวัสดีครับ, ผู้ดูแลระบบ 👋</h1></div></div><div className="flex items-center gap-3"><button className="relative hidden rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 sm:block"><Bell size={20}/><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"/></button><div className="hidden h-8 w-px bg-slate-200 sm:block"/><div className="flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">ผด</div><div className="hidden text-sm md:block"><p className="font-semibold">ผู้ดูแลอาคาร</p><p className="text-xs text-slate-500">Administrator</p></div><ChevronDown size={16} className="text-slate-400"/></div></div></header>
        <div className="p-5 md:p-10"><div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-1 text-sm font-medium text-blue-600">ภาพรวมอาคาร</p><h2 className="text-3xl font-bold tracking-tight text-slate-900">อาคารเดอะไพร์ม เพลส</h2><p className="mt-2 text-slate-500">สรุปข้อมูลสำคัญของนิติบุคคลประจำวันนี้</p></div><button className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"><ArrowUpRight size={17}/>ดูรายงานทั้งหมด</button></div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[
            ['ห้องชุดทั้งหมด','120','ห้อง','+2.4% จากเดือนก่อน',Building2,'blue'],['ชำระแล้วเดือนนี้','฿ 428,500','บาท','+12.8% จากเดือนก่อน',CircleDollarSign,'emerald'],['ยอดค้างชำระ','฿ 36,200','บาท','-5.2% จากเดือนก่อน',TrendingUp,'orange'],['แจ้งซ่อมรอดำเนินการ','8','รายการ','2 รายการเร่งด่วน',Wrench,'violet']
          ].map(([label, value, unit, trend, Icon, color]) => <div key={label as string} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><div className="mb-5 flex items-start justify-between"><div><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold text-slate-900">{value} <span className="text-sm font-normal text-slate-400">{unit}</span></p></div><div className={`rounded-xl p-3 bg-${color}-50 text-${color}-600`}><Icon size={21}/></div></div><p className={`text-xs ${String(trend).includes('เร่งด่วน') ? 'text-orange-600' : 'text-emerald-600'}`}>{trend}</p></div>)}</div>
          <div className="mt-6 grid gap-6 xl:grid-cols-5"><section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-3"><div className="mb-6 flex items-center justify-between"><div><h3 className="font-bold text-slate-900">ภาพรวมรายรับ</h3><p className="mt-1 text-sm text-slate-500">เปรียบเทียบรายรับค่าส่วนกลาง 6 เดือนล่าสุด</p></div><select className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slate-600"><option>ปี 2569</option></select></div><div className="flex h-52 items-end gap-3 border-b border-l border-slate-100 px-3 pb-0 pt-5 sm:gap-6">{[['เม.ย.','55%'],['พ.ค.','68%'],['มิ.ย.','62%'],['ก.ค.','78%'],['ส.ค.','72%'],['ก.ย.','90%']].map(([month, height]) => <div key={month} className="flex h-full flex-1 flex-col justify-end gap-2 text-center"><div className="group relative mx-auto w-full max-w-12 rounded-t-lg bg-blue-100 transition hover:bg-blue-500" style={{height}}><div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-white group-hover:block">฿{height}</div></div><span className="text-xs text-slate-400">{month}</span></div>)}</div></section>
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-2"><div className="mb-5 flex items-center justify-between"><div><h3 className="font-bold text-slate-900">กิจกรรมล่าสุด</h3><p className="mt-1 text-sm text-slate-500">รายการอัปเดตล่าสุดในระบบ</p></div><button className="text-sm font-semibold text-blue-600 hover:underline">ดูทั้งหมด</button></div><div className="space-y-5">{activities.map(({icon: Icon, title, detail, time, color}) => <div key={title} className="flex gap-3"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}><Icon size={17}/></div><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-800">{title}</p><p className="truncate text-xs text-slate-500">{detail}</p></div><span className="whitespace-nowrap text-[11px] text-slate-400">{time}</span></div>)}</div></section></div>
          <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"><div className="mb-5 flex items-center justify-between"><div><h3 className="font-bold text-slate-900">รายการที่ต้องดำเนินการ</h3><p className="mt-1 text-sm text-slate-500">งานสำคัญที่รอการจัดการ</p></div><button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><Search size={18}/></button></div><div className="grid gap-3 md:grid-cols-3"><div className="flex items-center gap-3 rounded-xl border border-orange-100 bg-orange-50/50 p-4"><ClipboardList className="text-orange-500" size={22}/><div><p className="text-sm font-semibold">อนุมัติใบแจ้งซ่อม</p><p className="text-xs text-slate-500">5 รายการรอตรวจสอบ</p></div><ArrowUpRight className="ml-auto text-slate-400" size={16}/></div><div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4"><Clock3 className="text-blue-500" size={22}/><div><p className="text-sm font-semibold">ติดตามยอดค้างชำระ</p><p className="text-xs text-slate-500">12 ห้องยังไม่ชำระ</p></div><ArrowUpRight className="ml-auto text-slate-400" size={16}/></div><div className="flex items-center gap-3 rounded-xl border border-violet-100 bg-violet-50/50 p-4"><CalendarDays className="text-violet-500" size={22}/><div><p className="text-sm font-semibold">เตรียมประชุมใหญ่</p><p className="text-xs text-slate-500">กำหนดวันที่ 30 ก.ย. 2569</p></div><ArrowUpRight className="ml-auto text-slate-400" size={16}/></div></div></section>
        </div>
      </main>
    </div>
  )
}
