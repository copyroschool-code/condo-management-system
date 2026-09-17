# Google Sheets setup

Create a tab named `Units` with this exact header row:

`เลขห้อง | อาคาร | ชื่อเจ้าของร่วม | เบอร์โทร | สถานะ | ยอดค้างชำระ`

Then configure `.env.local` from `.env.example`. Share the spreadsheet with the service account email as Editor. Open `/units` in the app to add, edit, search, and refresh units. The app uses the existing `/api/sheets` server route, so credentials never reach the browser.
