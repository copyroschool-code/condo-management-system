# การเชื่อมต่อ Google Sheets

ระบบใช้ Google Sheets เป็นฐานข้อมูลขนาดเล็ก เหมาะกับการใช้งาน 1 อาคารและผู้ดูแล 1 คน

## 1. เตรียม Google Sheet

สร้าง Spreadsheet แล้วสร้างชีตชื่อ `Units` จากนั้นใส่หัวตารางตัวอย่าง:

| เลขห้อง | อาคาร | ชื่อเจ้าของร่วม | เบอร์โทร | สถานะ | ยอดค้างชำระ |
|---|---|---|---|---|---|
| A-0101 | A | สมชาย ใจดี | 0812345678 | ชำระแล้ว | 0 |

คัดลอก Spreadsheet ID จาก URL รูปแบบ `https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit`

## 2. สร้าง Service Account

1. เปิด Google Cloud Console และสร้าง Project
2. เปิดใช้งาน **Google Sheets API**
3. สร้าง Service Account และสร้าง JSON key
4. แชร์ Google Sheet ให้กับอีเมล `client_email` ใน JSON โดยให้สิทธิ์ Editor

## 3. ตั้งค่า Environment Variables

คัดลอก `.env.example` เป็น `.env.local` แล้วกรอกค่า:

```bash
GOOGLE_SHEET_ID=your_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
```

ห้าม commit `.env.local` หรือ JSON key ขึ้น GitHub

## 4. API ที่ระบบมีให้

- `GET /api/sheets?range=Units!A1:Z1000` อ่านข้อมูล
- `POST /api/sheets` เพิ่มแถว เช่น `{ "range": "Units!A:Z", "values": [["A-0102", "A", "...", "...", "ค้างชำระ", 1200]] }`
- `PUT /api/sheets` แก้ไขช่วงข้อมูล เช่น `{ "range": "Units!A2:F2", "values": [["A-0101", "A", "สมชาย ใจดี", "0812345678", "ชำระแล้ว", 0]] }`

เรียกใช้งานผ่านฝั่งเซิร์ฟเวอร์เท่านั้น เพื่อไม่เปิดเผย Service Account ในเบราว์เซอร์
