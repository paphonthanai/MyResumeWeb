# site-builder — build เว็บไซต์ลูกค้าจาก SiteSnapshot

ขั้นแรกของ Phase 1: build เว็บ Fire First จากข้อมูลบนแพลตฟอร์ม (`SiteSnapshot`) แทนไฟล์เนื้อหาที่เขียนด้วยมือ

แม่แบบ "Poster" ตอนนี้คือโค้ดใน `web/` ของ repo Fire First ทั้งชุด ซึ่งอ่านเนื้อหาจาก 2 ไฟล์
site-builder สร้าง 2 ไฟล์นั้นใหม่จาก snapshot แล้ว build ด้วยโค้ดเดิมที่ไม่ได้แก้

| ไฟล์ในแม่แบบ | สร้างจาก |
|---|---|
| `src/content/ff-content.js` | `toLegacy(snapshot)` + ฟังก์ชัน `pick` ของไฟล์เดิม |
| `src/content/site.js` | `settings.contact`, `settings.url` และขนาดรูป + alt ใน `media` |

## ตรวจว่าผลลัพธ์ตรงกับเว็บเดิม

```bash
npm run site:verify-ff                                   # snapshot จากการแปลงเว็บเดิม
npm run site:verify-ff -- path/to/snapshot.json          # snapshot ที่กำหนดเอง
```

สคริปต์จะ build 2 ครั้งในโฟลเดอร์ `.work/` (ไม่ commit):

1. `baseline`: โค้ดเดิมทั้งหมด (`npm ci` + `npm run build`)
2. `from-snapshot`: โค้ดเดิม แต่ไฟล์เนื้อหาสร้างจาก snapshot (ใช้ `node_modules` ร่วมกับ baseline)

จากนั้นเทียบทุกไฟล์ `.html`, `sitemap.xml` และ `robots.txt` แบบตัวอักษรต่อตัวอักษร
ก่อนเทียบจะตัด hash ออกจากชื่อไฟล์ใน `/assets/` เพราะโค้ดของโมดูลเนื้อหาต่างกัน (JSON แทน `T()`) hash ของ bundle จึงต่างแม้ข้อมูลเหมือนกัน
ผลอยู่ที่ `.work/report.json` และสคริปต์จะออกด้วย exit code 1 ถ้ามีไฟล์ที่ไม่ตรง

## ยังไม่ได้ทำในขั้นนี้

- ข้อความที่เขียนไว้ใน `.vue` โดยตรง (ชื่อวิดีโอ แผนที่ ข้อความ error ของฟอร์ม JSON-LD ของบริษัท) ยังมาจากโค้ดแม่แบบ ส่วนนี้จะย้ายไปอ่านจาก snapshot เมื่อแตกหน้าเป็น block
- ยังไม่อ่าน snapshot จาก Firestore และยังไม่ deploy
