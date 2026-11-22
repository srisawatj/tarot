# ดูดวงหวานใจ (Tarot web app)
เว็บไซต์แบบ static ล้วน (HTML + JS + รูปภาพ) ไม่มี backend วางบนโฮสต์ฟรีได้ทุกเจ้า (GitHub Pages, Netlify, Cloudflare Pages)
เปิดไฟล์ index.html เป็นหน้าแรก

มี 3 โหมด
- **ไพ่ทาโรต์** 78 ใบ เลือกไพ่เอง หลายผัง (`app.js`, ความหมายใน `data.js`)
- **เสี่ยงเซียมซี** 28 ใบ คำทำนายแต่งใหม่ทั้งชุด (`siamsi.js`)
- **ผังดวงกำเนิด** คำนวณตำแหน่งดาวจริงจากวัน เวลา สถานที่เกิด (`astro.js` สูตรของ Paul Schlyter, `chart.js` วงล้อและคำอ่าน)

เครดิต
- ภาพไพ่: Free Printable Tarot Deck จาก On Your Journey (https://onyourjourney.co.uk) ใช้ส่วนตัว
- หลังไพ่: วาดเอง (`art.js`)
- ฟอนต์: Mali และ Noto Sans Thai Looped จาก Google Fonts
