import { NextRequest, NextResponse } from 'next/server'
import { appendSheetRows, readSheet, updateSheetRange } from '@/lib/google-sheets'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const range = request.nextUrl.searchParams.get('range') || 'Units!A1:Z1000'
    const values = await readSheet(range)
    return NextResponse.json({ range, values })
  } catch (error) {
    console.error('Google Sheets GET error:', error)
    return NextResponse.json({ error: 'ไม่สามารถอ่านข้อมูลจาก Google Sheets ได้' }, { status: 500 })
  }
}

async function parseBody(request: NextRequest) {
  const body = await request.json()
  if (!body || typeof body.range !== 'string' || !Array.isArray(body.values) || !body.values.every(Array.isArray)) {
    throw new Error('Body must contain range and a two-dimensional values array')
  }
  return { range: body.range as string, values: body.values as Array<Array<string | number | boolean | null>> }
}

export async function POST(request: NextRequest) {
  try {
    const { range, values } = await parseBody(request)
    await appendSheetRows(range, values)
    return NextResponse.json({ success: true, message: 'เพิ่มข้อมูลเรียบร้อยแล้ว' })
  } catch (error) {
    console.error('Google Sheets POST error:', error)
    return NextResponse.json({ error: 'ไม่สามารถเพิ่มข้อมูลลง Google Sheets ได้' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { range, values } = await parseBody(request)
    await updateSheetRange(range, values)
    return NextResponse.json({ success: true, message: 'แก้ไขข้อมูลเรียบร้อยแล้ว' })
  } catch (error) {
    console.error('Google Sheets PUT error:', error)
    return NextResponse.json({ error: 'ไม่สามารถแก้ไขข้อมูลใน Google Sheets ได้' }, { status: 500 })
  }
}
