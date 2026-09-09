# SEO Implementation Plan — Thanakhon Portfolio

## เป้าหมายหลัก

SEO ของโปรเจกต์นี้มีเป้าหมาย **แคบและชัดเจน**:

> เมื่อคนค้นหา `Thanakhon Oonklan` หรือชื่อของเจ้าของ Portfolio บน Google ให้ Google เข้าใจว่าเว็บไซต์นี้คือ Portfolio ของ Thanakhon Oonklan และแสดงเว็บไซต์ด้วย Title / Description ที่ถูกต้อง

ไม่ต้องทำ SEO เพื่อแข่ง Keyword กว้าง ๆ เช่น `Junior Full Stack Developer Thailand` เว้นแต่ภายหลังจะมีความจำเป็น

## สิ่งที่ต้องทำ

1. Metadata ที่ถูกต้อง
2. Canonical URL
3. Sitemap
4. robots.txt
5. Semantic HTML และ H1 ที่ชัดเจน
6. ตรวจสอบ indexing / crawlability
7. Google Search Console
8. ทดสอบผลลัพธ์หลัง Deploy

## สิ่งที่ไม่ต้องทำตอนนี้

- ไม่ต้องทำ keyword research เชิงลึก
- ไม่ต้องทำ keyword stuffing
- ไม่ต้องทำ backlink strategy
- ไม่ต้องทำ blog / content marketing
- ไม่ต้องทำ SEO เชิงแข่งขันสำหรับ keyword กว้าง ๆ
- ไม่ต้องเพิ่ม dependency ที่ไม่จำเป็น
- ไม่ต้องเปลี่ยน UI/UX เพื่อ SEO
- ไม่ต้องปรับ GSAP / Lenis / animation เว้นแต่พบว่ากระทบ crawlability หรือ performance อย่างชัดเจน
- ไม่ต้องทำ structured data หลายประเภทในรอบแรก
- ไม่ต้องทำ social SEO / Open Graph เป็นงานหลักของรอบนี้

---

# Project Context

Project: `Thanakhon-Portfolio`

Tech stack:
- Next.js App Router
- TypeScript
- React
- Tailwind CSS v4
- GSAP / Lenis
- i18n (`th` / `en`)
- Vercel
- `@vercel/analytics`
- `@vercel/speed-insights`

โครงสร้างที่เกี่ยวข้อง:

```text
src/
├── app/
│   ├── api/
│   ├── projects/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── icon.png
├── components/
├── constants/
├── data/
├── hooks/
├── messages/
│   ├── en.json
│   └── th.json
├── providers/
├── styles/
└── types/
```

---

# SDLC Phase 1 — Planning & Audit

## 1.1 Audit ก่อนแก้

ตรวจสอบก่อนทุกอย่าง:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/projects/page.tsx`
- `src/constants/site.ts`
- `src/messages/en.json`
- `src/messages/th.json`
- `<title>` / Metadata ปัจจุบัน
- `<h1>` / `<h2>` / `<h3>`
- canonical ที่มีอยู่
- sitemap / robots ที่มีอยู่
- `<Image>` และ `alt`
- internal links
- language switching
- production domain
- Next.js version / `package.json`

**ห้ามแก้โค้ดใน Phase 1**

### Deliverable
รายงาน:

```text
✅ มีแล้ว
⚠️ มีแต่ควรปรับ
❌ ยังไม่มี
🛑 เสี่ยงกระทบระบบ
```

---

# SDLC Phase 2 — Requirements

## 2.1 กำหนด Search Identity

ให้ใช้ข้อมูลจริงจากโปรเจกต์ ห้ามเดา:

- Full Name: `Thanakhon Oonklan`
- Primary role: `Junior Full Stack Developer`
- Secondary keywords ที่เกี่ยวข้องจริง: `Frontend`, `React`, `Next.js`, `TypeScript`
- Production URL: ใช้ domain จริงจาก Vercel / project config

### เป้าหมาย Search Result

ต้องการให้ผลค้นหาใกล้เคียง:

```text
Thanakhon Oonklan | Junior Full Stack Developer

Portfolio of Thanakhon Oonklan, a Junior Full Stack Developer
focused on frontend and modern web development.
```

ข้อความจริงให้ AI ปรับตามข้อมูลใน source code โดยไม่สร้างข้อมูลเท็จ

---

# SDLC Phase 3 — Design

ออกแบบ SEO โดยไม่เปลี่ยนหน้าตาเว็บไซต์

## 3.1 Metadata

กำหนดให้ชัดเจน:

- `title`
- `description`
- `metadataBase`
- `alternates.canonical`

## 3.2 Heading Structure

หน้าแรกควรมี H1 ที่ระบุตัวตนชัดเจน เช่นชื่อ:

```html
<h1>Thanakhon Oonklan</h1>
```

H2 ใช้กับ section สำคัญ เช่น:

```text
About
Projects
Skills
Experience
Contact
```

ห้ามเพิ่ม Heading เพียงเพื่อยัด Keyword

## 3.3 Sitemap / Robots

สร้างด้วยวิธีมาตรฐานของ Next.js เท่านั้น เช่น:

```text
src/app/sitemap.ts
src/app/robots.ts
```

ให้รวมเฉพาะ route ที่ควร index เช่น:

```text
/
/projects
```

ห้ามเปิด indexing สำหรับ API routes หรือหน้าที่ไม่ควรอยู่ใน Search Engine

---

# SDLC Phase 4 — Implementation

ทำ **ทีละงาน** ตามลำดับนี้:

### 4.1 ปรับ Metadata

เริ่มจาก `src/app/layout.tsx`

ห้ามทำลาย:
- AppProviders
- Theme
- i18n
- GSAP / Lenis
- Analytics
- Speed Insights

### 4.2 เพิ่ม Canonical

ใช้ production domain จริงเท่านั้น

ห้ามเดา domain

ถ้าไม่พบ domain ให้สร้าง TODO และหยุดงานส่วนนี้

### 4.3 เพิ่ม Sitemap

สร้าง `src/app/sitemap.ts`

ตรวจว่าผลลัพธ์เข้าถึงได้ที่:

```text
/sitemap.xml
```

### 4.4 เพิ่ม Robots

สร้าง `src/app/robots.ts`

ตรวจว่าผลลัพธ์เข้าถึงได้ที่:

```text
/robots.txt
```

### 4.5 ปรับ H1 / Semantic HTML

แก้เฉพาะจุดที่จำเป็น

ไม่เปลี่ยน visual design

### 4.6 ตรวจ Image Alt

แก้เฉพาะรูปที่มีความหมายและยังไม่มี `alt` ที่เหมาะสม

ไม่ยัดชื่อหรือ Keyword ลงทุกภาพ

---

# SDLC Phase 5 — Testing & Validation

หลังแต่ละงานให้ตรวจทันที

## 5.1 Local

รัน:

```bash
npm run dev
```

ตรวจ:

```text
/
/projects
/sitemap.xml
/robots.txt
```

## 5.2 Build

รัน:

```bash
npm run build
```

ต้องไม่มี build error

## 5.3 Regression Check

ตรวจว่า:

- Navigation ยังทำงาน
- Language switch ยังทำงาน
- Theme ยังทำงาน
- GSAP / Lenis ยังทำงาน
- Analytics ยังทำงาน
- Speed Insights ยังทำงาน
- ไม่มี hydration error ใหม่
- ไม่มี layout regression

---

# SDLC Phase 6 — Deployment

Deploy ไป Vercel และตรวจ Production URL จริง

ตรวจ:

```text
https://YOUR-DOMAIN/
https://YOUR-DOMAIN/projects
https://YOUR-DOMAIN/sitemap.xml
https://YOUR-DOMAIN/robots.txt
```

ตรวจ `<title>` และ description จาก production จริง

---

# SDLC Phase 7 — Google Search Console

หลัง deploy:

1. เพิ่มเว็บไซต์ใน Google Search Console
2. Verify ownership
3. Submit `sitemap.xml`
4. ใช้ URL Inspection กับหน้า `/`
5. Request Indexing

เป้าหมายคือให้ Google เริ่ม crawl และ index Portfolio

**ห้ามคาดหวังให้ Google แสดงผลทันที**

---

# SDLC Phase 8 — Monitoring

ในรอบแรกติดตามแค่:

- หน้า Homepage ถูก index หรือยัง
- ค้น `Thanakhon Oonklan` แล้วเว็บเริ่มปรากฏหรือยัง
- Search result แสดง title ถูกต้องหรือไม่
- Description ถูกต้องหรือไม่
- Canonical ถูกต้องหรือไม่

ไม่ต้องทำ SEO dashboard เพิ่ม

---

# Definition of Done

งานถือว่าเสร็จเมื่อ:

- [x] Metadata ถูกต้อง (`title`, `description`, `metadataBase`, `canonical` ใน `layout.tsx`)
- [x] Metadata หน้า `/projects` ถูกต้อง (แยกผ่าน `src/app/projects/layout.tsx`)
- [x] Canonical ถูกต้อง (`alternates.canonical` ใน layout ทั้งสองหน้า)
- [x] Sitemap ใช้งานได้ (`src/app/sitemap.ts` → `/sitemap.xml`)
- [x] robots.txt ใช้งานได้ (`src/app/robots.ts` → `/robots.txt`)
- [x] H1 ระบุตัวตนชัดเจน (`THANAKHON OONKLAN` ใน Hero.tsx)
- [x] รูปสำคัญมี alt ที่เหมาะสม (Hero, About, Contact ครบ)
- [x] `npm run build` ผ่าน (ไม่มี error)
- [ ] Production ทำงานปกติ (ต้อง deploy ก่อนตรวจ)
- [ ] Google Search Console ถูกตั้งค่า
- [ ] Sitemap ถูก Submit
- [x] ไม่มี regression ที่กระทบ UI / UX / animation / i18n

---

# Rules สำหรับ AI ที่ทำงานนี้

1. **ตรวจโปรเจกต์ก่อนแก้เสมอ**
2. ทำงานทีละ Phase ตามลำดับ
3. ทำทีละงานเล็ก ๆ และตรวจผลก่อนงานถัดไป
4. อย่าแก้ส่วนที่ไม่เกี่ยวกับ SEO
5. อย่าเพิ่ม dependency ถ้า Next.js มี solution ในตัว
6. อย่าเปลี่ยน UI/UX เพื่อ SEO
7. อย่าสร้างข้อมูลหรือ keyword ที่ไม่มีหลักฐานใน project
8. อย่าเดา production domain
9. หลังแก้โค้ดต้องรัน validation ที่เหมาะสม
10. ถ้าเจอสิ่งที่เสี่ยงกระทบระบบเดิม ให้หยุดและรายงานก่อนแก้

---

# เริ่มต้นทำงาน

**เริ่มที่ SDLC Phase 1 เท่านั้น**

ขั้นแรกคือ Audit โปรเจกต์และรายงานสิ่งที่มีอยู่ก่อน ห้ามเริ่ม implementation จนกว่าจะสรุป Audit เสร็จ

เมื่อจบแต่ละ Phase ให้รายงาน:

```text
Phase:
Status:
Changed files:
What changed:
Validation:
Problems:
Next Phase:
```
