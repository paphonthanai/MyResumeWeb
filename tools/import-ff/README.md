# import-ff — ย้ายเนื้อหาเว็บ Fire First เข้าแพลตฟอร์ม

อ่าน `web/src/content/ff-content.js`, `web/src/content/site.js` และไฟล์ใน `web/public/` ของ repo
[Fire_First_Savety_And_Truck](https://github.com/paphonthanai/Fire_First_Savety_And_Truck)
แล้วแปลงเป็น `SiteSnapshot` ตาม `@pnjtech/schema`

ค่าเริ่มต้นจะอ่านจาก repo Fire First ที่ clone ไว้ข้าง repo นี้ (`../firefirst/web`) หรือกำหนดเองด้วย `FIRE_FIRST_WEB`
ถ้าไม่พบ เทสต์ของ import-ff จะถูกข้าม (skip) ส่วนเทสต์ของ schema ยังรันตามปกติ

```bash
npm install            # ที่ root ของ repo
npm run import:ff      # เขียน out/fire-first.snapshot.json และ out/fire-first.firestore.json
npm test               # รวมเทสต์ว่าแปลงกลับได้ตรงทุกค่า
FIRE_FIRST_WEB=/path/to/firefirst/web npm test
```

`toLegacy()` แปลง snapshot กลับเป็นโครงเดียวกับ `D` ใน ff-content.js
เทสต์เทียบผลลัพธ์กับ `D` ทุกค่า จึงยืนยันได้ว่าไม่มีข้อความหายระหว่างแปลง
ใน P1 ฟังก์ชันนี้ใช้เป็นตัวเชื่อม ให้หน้า `.vue` เดิมแสดงข้อมูลจาก Firestore ได้ก่อนแตกเป็น block

## ค่าใน ff-content.js ไปอยู่ที่ไหน

| ff-content.js | SiteSnapshot |
|---|---|
| `brand`, `legal`, `slogan` | `settings.brand.name / legal / slogan` |
| `nav` | `settings.nav[]` (`id` → `page`) |
| `cta`, `call` | `settings.header.cta.label`, `settings.header.call` |
| `more` | หน้า home → block `worksMosaic.more.label` |
| `hero.kicker`, `hero.lead` | หน้า home → block `hero` |
| `hero.h1` | หน้า home → block `intro.heading` |
| `values`, `services`, `fleet`, `works`, `reviews`, `pricing`, `faq` | `collections[]` ชื่อเดียวกัน (`works.img` → `image.media`) |
| `reviewNote` | หน้า home → block `reviews.note` |
| `about.h` | หน้า about → block `titleBand.heading` |
| `about.p`, `about.md`, `about.mdr`, `about.facts` | หน้า about → block `profile` (`about.p` ใช้ซ้ำใน home → `intro.body`) |
| `contact.addr`, `contact.tel`, `contact.mail` | `settings.contact.address / phone / email` |
| `contact.l.addr`, `contact.l.mail` | หน้า contact → block `contactBand.labels` |
| `contact.l.name / org / tel / msg / send / sent` | `forms[contact]` → label ของ field, `submitLabel`, `successMessage` |
| `seo.{page}` | `pages[].seo.title / description` |
| `h.services` | products → `pageHeading`, home → `serviceList.heading` และ `hero.cta.label` |
| `h.fleet`, `h.pricing` | products → `cardGrid.heading`, `pricingList.heading` |
| `h.works`, `h.all` | works → `worksGrid.heading`, `allLabel` (home → `worksMosaic.heading`) |
| `h.reviews` | home → `reviews.heading` |
| `h.faq`, `h.contact` | contact → `faq.heading`, `contactBand.heading` |
| `h.about` | about → `titleBand.kicker`, home → `intro.cta.label` |
| `h.hq` | about → `photo.caption` |
| `h.close`, `h.closeSub` | `settings.footer.closing / closingSub` |

ค่าที่ใช้หลายที่ถูกคัดลอกไปทุก block ที่ใช้ แก้แยกกันได้ใน editor
`toLegacy()` อ่านจากตำแหน่งแรกในตารางเสมอ

## ข้อความที่ย้ายจากโค้ด (ไม่ได้อยู่ใน ff-content.js)

- ชื่อและ aria-label ของวิดีโอ, `uploadDate`, `duration` (HomePage.vue) → block `video`
- aria-label ปุ่มกรองหมวด (WorksPage.vue) → `worksGrid.filterLabel`
- แผนที่ (ContactPage.vue) → block `map`
- ข้อความกำลังส่ง / ส่งไม่สำเร็จ (ContactPage.vue) → `forms[contact].sendingLabel / errorMessage`
- keywords, ข้อมูล LocalBusiness, OG_VERSION (useSeo.js) → `settings.seo`, `settings.organization`, `settings.contact.postal`
- โลโก้ตัวอักษร FIRE / FIRST และ 24/7 (SiteRail.vue) → `settings.brand.wordmark / tagline`, `settings.header.badge`
- ขนาดรูปและ alt (site.js `IMAGES`) → `media[]`
