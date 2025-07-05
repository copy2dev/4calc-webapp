# GitHub + Netlify Deployment Guide

## 🚀 ขั้นตอนการ Setup GitHub และ Netlify

### 1. Setup GitHub Repository

#### A. สร้าง Repository ใหม่ใน GitHub
1. ไปที่ [github.com](https://github.com)
2. คลิก "New repository"
3. ตั้งชื่อ: `4calc-webapp`
4. เลือก Public หรือ Private
5. **ไม่ต้อง** เลือก "Initialize with README"
6. คลิก "Create repository"

#### B. เชื่อม Cursor/VS Code กับ GitHub
```bash
# ใน terminal ของ Cursor/VS Code
git init
git add .
git commit -m "Initial commit: 4Calc v1.0.0"

# เพิ่ม remote (แทนที่ YOUR_USERNAME ด้วยชื่อ GitHub ของคุณ)
git remote add origin https://github.com/YOUR_USERNAME/4calc-webapp.git

# Push ขึ้น GitHub
git branch -M main
git push -u origin main
```

#### C. อัปเดต package.json ด้วยชื่อ GitHub ของคุณ
แก้ไขใน `package.json`:
```json
"repository": {
  "type": "git",
  "url": "git+https://github.com/YOUR_USERNAME/4calc-webapp.git"
},
"bugs": {
  "url": "https://github.com/YOUR_USERNAME/4calc-webapp/issues"
},
"homepage": "https://github.com/YOUR_USERNAME/4calc-webapp#readme"
```

---

### 2. Setup Netlify Deployment

#### A. เชื่อม GitHub กับ Netlify
1. ไปที่ [netlify.com](https://netlify.com)
2. คลิก "Sign up" หรือ "Log in"
3. เลือก "Sign up with GitHub"
4. อนุญาตให้ Netlify เข้าถึง GitHub

#### B. สร้าง Site ใหม่
1. คลิก "New site from Git"
2. เลือก "GitHub"
3. อนุญาตให้ Netlify เข้าถึง repositories
4. เลือก repository `4calc-webapp`

#### C. ตั้งค่า Build Settings
```
Build command: node build.js && cp dist/* .
Publish directory: .
```

#### D. ตั้งค่า Environment Variables (ถ้าต้องการ)
ใน Netlify dashboard:
- ไปที่ Site settings → Environment variables
- เพิ่ม:
  ```
  NODE_ENV = production
  ```

---

### 3. การ Deploy และ Auto-Deploy

#### A. Deploy ครั้งแรก
1. Push code ขึ้น GitHub:
   ```bash
   git add .
   git commit -m "Setup Netlify deployment"
   git push origin main
   ```

2. Netlify จะ auto-build และ deploy ให้อัตโนมัติ

#### B. ดู Build Status
- ใน Netlify dashboard จะเห็น build progress
- เมื่อเสร็จจะได้ URL เช่น: `https://amazing-pasteur-123456.netlify.app`

#### C. ตั้งชื่อ Site ใหม่ (Optional)
1. ใน Netlify dashboard → Site settings
2. คลิก "Change site name"
3. ตั้งชื่อเช่น: `4calc-hub`
4. URL จะเป็น: `https://4calc-hub.netlify.app`

---

### 4. Custom Domain (Optional)

#### A. ใช้ Subdomain ของ Netlify (ฟรี)
- URL: `https://your-site-name.netlify.app`
- SSL Certificate: ให้อัตโนมัติ

#### B. ใช้ Custom Domain
1. ซื้อ domain (เช่น `4calc.com`)
2. ใน Netlify → Domain settings
3. คลิก "Add custom domain"
4. ใส่ domain name
5. อัปเดต DNS records ตามที่ Netlify บอก

---

### 5. Workflow สำหรับการอัปเดต

#### A. Development Workflow
```bash
# แก้ไขโค้ด
nano index.html

# Test locally
node server.js

# Commit และ push
git add .
git commit -m "Update: เพิ่มฟีเจอร์ใหม่"
git push origin main

# Netlify จะ auto-deploy ให้
```

#### B. Release Workflow
```bash
# สร้าง release ใหม่
node release.js minor "เพิ่ม calculator ใหม่"

# Push พร้อม tags
git push origin main --tags

# Netlify จะ deploy version ใหม่อัตโนมัติ
```

---

### 6. การตรวจสอบและ Monitoring

#### A. Build Logs
- ใน Netlify dashboard → Deploys
- คลิกที่ deploy ล่าสุดเพื่อดู logs

#### B. Performance Monitoring
- Netlify จะวัด performance อัตโนมัติ
- ดูได้ใน Analytics tab

#### C. Health Check
```bash
# ตรวจสอบเว็บทำงานปกติ
curl https://your-site.netlify.app
```

---

### 7. Advanced Features

#### A. Branch Previews
- สร้าง branch ใหม่: `git checkout -b feature/new-calculator`
- Push branch: `git push origin feature/new-calculator`
- Netlify จะสร้าง preview URL ให้อัตโนมัติ

#### B. Form Handling (สำหรับอนาคต)
- Netlify รองรับ form submission โดยไม่ต้องใช้ backend

#### C. Functions (ถ้าต้องการ API)
- สร้างโฟลเดอร์ `netlify/functions/`
- เขียน serverless functions

---

### 8. Troubleshooting

#### A. Build Failed
```bash
# ตรวจสอบ build logs ใน Netlify
# แก้ไขปัญหาแล้ว push ใหม่
git add .
git commit -m "Fix: แก้ไข build error"
git push origin main
```

#### B. Site ไม่แสดงผล
1. ตรวจสอบ build command ใน netlify.toml
2. ตรวจสอบ publish directory
3. ดู deploy logs

#### C. Environment Variables
- ตั้งค่าใน Netlify dashboard
- ไม่ใส่ secrets ใน code

---

## 🎯 สรุปขั้นตอนสั้น ๆ:

1. **สร้าง GitHub repo** และ push code
2. **เชื่อม Netlify** กับ GitHub repo
3. **ตั้งค่า build**: `node build.js && cp dist/* .`
4. **Deploy อัตโนมัติ** ทุกครั้งที่ push

**ผลลัพธ์:** เว็บจะอยู่ที่ `https://your-site.netlify.app` และ auto-deploy ทุกครั้งที่มีการอัปเดต!

---

## 🔗 ลิงก์ที่เป็นประโยชน์:

- [Netlify Docs](https://docs.netlify.com/)
- [GitHub Docs](https://docs.github.com/)
- [Custom Domain Setup](https://docs.netlify.com/domains-https/custom-domains/)
- [Environment Variables](https://docs.netlify.com/environment-variables/overview/)