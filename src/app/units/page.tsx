'use client'

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Building2, Pencil, Plus, RefreshCw, Search, Trash2, X } from 'lucide-react'

type Unit = {
  row: number
  unitNo: string
  building: string
  owner: string
  phone: string
  status: string
  balance: number
}

const headers = ['เลขห้อง', 'อาคาร', 'ชื่อเจ้าของร่วม', 'เบอร์โทร', 'สถานะ', 'ยอดค้างชำระ']
const emptyForm = { unitNo: '', building: 'A', owner: '', phone: '', status: 'ชำระแล้ว', balance: '0' }

function toUnit(row: string[], index: number): Unit {
  return {
    row: index + 2,
    unitNo: row[0] ?? '',
    building: row[1] ?? '',
    owner: row[2] ?? '',
    phone: row[3] ?? '',
    status: row[4] ?? 'ชำระแล้ว',
    balance: Number(row[5] ?? 0) || 0,
  }
}

export default function UnitsPage() {
  const [units, setUnits] = useState<Unit[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingRow, setEditingRow] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const loadUnits = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/sheets?range=Units!A1:F1000', { cache: 'no-store' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'โหลดข้อมูลไม่สำเร็จ')
      const rows = data.values ?? []
      setUnits(rows.slice(1).filter((row: string[]) => row[0]).map(toUnit))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ไม่สามารถเชื่อมต่อ Google Sheets ได้')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void loadUnits() }, [loadUnits])

  const filteredUnits = useMemo(() => units.filter((unit) =>
    [unit.unitNo, unit.owner, unit.phone, unit.status].join(' ').toLowerCase().includes(query.toLowerCase()),
  ), [units, query])

  const resetForm = () => { setForm(emptyForm); setEditingRow(null) }
  const editUnit = (unit: Unit) => {
    setEditingRow(unit.row)
    setForm({ unitNo: unit.unitNo, building: unit.building, owner: unit.owner, phone: unit.phone, status: unit.status, balance: String(unit.balance) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function submit(event: FormEvent) {
    event.preventDefault()
    setSaving(true); setError(''); setMessage('')
    const values = [[form.unitNo.trim(), form.building.trim(), form.owner.trim(), form.phone.trim(), form.status, Number(form.balance) || 0]]
    try {
      const response = await fetch('/api/sheets', {
        method: editingRow ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ range: editingRow ? `Units!A${editingRow}:F${editingRow}` : 'Units!A:F', values }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'บันทึกข้อมูลไม่สำเร็จ')
      setMessage(editingRow ? 'แก้ไขข้อมูลห้องชุดแล้ว' : 'เพิ่มข้อมูลห้องชุดแล้ว')
      resetForm()
      await loadUnits()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ไม่สามารถบันทึกข้อมูลได้')
    } finally { setSaving(false) }
  }

  return <main className="min-h-screen bg-[#f5f7fb] p-5 md:p-10 lg:ml-72">
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-1 text-sm font-medium text-blue-600">จัดการข้อมูล</p><h1 className="text-3xl font-bold text-slate-900">ห้องชุดและผู้พักอาศัย</h1><p className="mt-2 text-slate-500">ข้อมูลนี้อ่านและบันทึกโดยตรงกับ Google Sheets</p></div><button onClick={() => void loadUnits()} className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><RefreshCw size={17} className={loading ? 'animate-spin' : ''}/>รีเฟรช</button></div>
      <form onSubmit={submit} className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold text-slate-900">{editingRow ? 'แก้ไขข้อมูลห้องชุด' : 'เพิ่มห้องชุด'}</h2>{editingRow && <button type="button" onClick={resetForm} className="flex items-center gap-1 text-sm text-slate-500"><X size={16}/>ยกเลิก</button>}</div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{[['unitNo','เลขห้อง'],['building','อาคาร'],['owner','ชื่อเจ้าของร่วม'],['phone','เบอร์โทร'],['balance','ยอดค้างชำระ']].map(([key, label]) => <label key={key} className="text-sm font-medium text-slate-600">{label}<input required={key !== 'balance'} type={key === 'balance' ? 'number' : 'text'} value={form[key as keyof typeof form]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /></label>)}<label className="text-sm font-medium text-slate-600">สถานะ<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-blue-500"><option>ชำระแล้ว</option><option>ค้างชำระ</option><option>ยกเว้น</option></select></label></div><button disabled={saving} className="mt-4 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{editingRow ? <Pencil size={16}/> : <Plus size={16}/>} {saving ? 'กำลังบันทึก...' : editingRow ? 'บันทึกการแก้ไข' : 'เพิ่มห้องชุด'}</button></form>
      {(error || message) && <div className={`mb-5 rounded-xl px-4 py-3 text-sm ${error ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>{error || message}</div>}
      <section className="rounded-2xl border border-slate-100 bg-white shadow-sm"><div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center"><div><h2 className="font-bold text-slate-900">รายการห้องชุด <span className="ml-1 text-sm font-normal text-slate-400">({filteredUnits.length})</span></h2></div><div className="relative"><Search className="absolute left-3 top-2.5 text-slate-400" size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ค้นหาห้องหรือชื่อเจ้าของ" className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 sm:w-72" /></div></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr>{headers.map((header) => <th key={header} className="px-5 py-3 font-semibold">{header}</th>)}<th className="px-5 py-3">จัดการ</th></tr></thead><tbody className="divide-y divide-slate-100">{loading ? <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-400">กำลังโหลดข้อมูล...</td></tr> : filteredUnits.length === 0 ? <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-400"><Building2 className="mx-auto mb-2" size={28}/>{error ? 'กรุณาตรวจสอบการตั้งค่า Google Sheets' : 'ยังไม่มีข้อมูลห้องชุด'}</td></tr> : filteredUnits.map((unit) => <tr key={unit.row} className="hover:bg-slate-50"><td className="px-5 py-4 font-semibold text-slate-900">{unit.unitNo}</td><td className="px-5 py-4 text-slate-600">{unit.building}</td><td className="px-5 py-4 text-slate-700">{unit.owner}</td><td className="px-5 py-4 text-slate-600">{unit.phone}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${unit.status === 'ค้างชำระ' ? 'bg-orange-50 text-orange-700' : 'bg-emerald-50 text-emerald-700'}`}>{unit.status}</span></td><td className="px-5 py-4 font-medium text-slate-700">฿ {unit.balance.toLocaleString('th-TH')}</td><td className="px-5 py-4"><div className="flex gap-2"><button onClick={() => editUnit(unit)} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50" aria-label={`แก้ไข ${unit.unitNo}`}><Pencil size={16}/></button><button disabled title="ลบข้อมูลได้โดยลบแถวใน Google Sheets" className="cursor-not-allowed rounded-lg p-2 text-slate-300" aria-label="ลบข้อมูล"><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div></section>
    </div>
  </main>
}
