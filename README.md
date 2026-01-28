# � ASTRONACCI - Trading & Research Platform

> **Platform edukasi trading dan research saham dengan sistem membership bertingkat**

---

## 📌 1. OVERVIEW PROYEK

### 1.1 Deskripsi

**Astronacci** adalah platform web untuk edukasi trading dan research pasar saham/finansial. Pengguna dapat mengakses artikel analisis market dan video tutorial trading berdasarkan level membership mereka. Mendukung login via Google, Facebook, atau manual.

### 1.2 Fitur Utama

- ✅ Register & Login via Google OAuth 2.0
- ✅ Register & Login via Facebook OAuth
- ✅ Register & Login Manual (Email + Password)
- ✅ 3 Tipe Membership (Free, Basic, Premium)
- ✅ Artikel Analisis Trading & Market Research
- ✅ Video Tutorial Trading & Edukasi
- ✅ Dashboard User dengan statistik akses konten

---

## 🛠️ 2. TECH STACK

### 2.1 Frontend (100% GRATIS)

| Teknologi        | Versi    | Keterangan                             | Gratis? |
| ---------------- | -------- | -------------------------------------- | ------- |
| React.js         | 18.x     | Library UI utama                       | ✅ Ya   |
| Vite             | 5.x      | Build tool (lebih cepat dari CRA)      | ✅ Ya   |
| Tailwind CSS     | 3.x      | Styling framework                      | ✅ Ya   |
| React Router DOM | 6.x      | Client-side routing                    | ✅ Ya   |
| Axios            | 1.x      | HTTP client                            | ✅ Ya   |
| React Context    | Built-in | State management (cukup untuk app ini) | ✅ Ya   |
| React Player     | 2.x      | Video player (YouTube embed)           | ✅ Ya   |

> 💡 **Kenapa simpel?** Tidak perlu React Query/Zustand karena app ini tidak terlalu kompleks. Context API bawaan React sudah cukup!

### 2.2 Backend (100% GRATIS)

| Teknologi               | Versi    | Keterangan                                  | Gratis? |
| ----------------------- | -------- | ------------------------------------------- | ------- |
| Node.js                 | 20.x LTS | Runtime environment                         | ✅ Ya   |
| Express.js              | 4.x      | Web framework                               | ✅ Ya   |
| Passport.js             | 0.7.x    | Authentication middleware                   | ✅ Ya   |
| passport-google-oauth20 | 2.x      | Google OAuth strategy                       | ✅ Ya   |
| passport-facebook       | 3.x      | Facebook OAuth strategy                     | ✅ Ya   |
| jsonwebtoken (JWT)      | 9.x      | Token-based auth                            | ✅ Ya   |
| bcryptjs                | 2.x      | Password hashing (pure JS, no build issues) | ✅ Ya   |
| cors                    | 2.x      | Cross-origin resource sharing               | ✅ Ya   |
| dotenv                  | 16.x     | Environment variables                       | ✅ Ya   |

> 💡 **Tips:** Pakai `bcryptjs` bukan `bcrypt` agar tidak ada masalah compile di Windows!

### 2.3 Database (100% GRATIS)

| Teknologi         | Keterangan                     | Gratis? |
| ----------------- | ------------------------------ | ------- |
| **MySQL 8.x**     | Database utama                 | ✅ Ya   |
| **Sequelize ORM** | 6.x - Database ORM & migration | ✅ Ya   |

#### 🎯 Opsi Database GRATIS:

| Platform            | Free Tier         | Keterangan                    |
| ------------------- | ----------------- | ----------------------------- |
| **XAMPP (Local)**   | Unlimited         | MySQL lokal untuk development |
| **Railway**         | $5 credit/bulan   | Cukup untuk project kecil     |
| **PlanetScale**     | 1 database gratis | MySQL serverless              |
| **Clever Cloud**    | 256MB gratis      | MySQL hosting                 |
| **FreeSQLDatabase** | 5MB gratis        | Untuk testing                 |

> 💡 **Rekomendasi:** Pakai **XAMPP** untuk development lokal, lalu **Railway** atau **PlanetScale** untuk production. GRATIS!

### 2.4 Storage (File/Media) - GRATIS!

| Teknologi         | Free Tier                           | Keterangan                                        |
| ----------------- | ----------------------------------- | ------------------------------------------------- |
| **YouTube Embed** | ✅ Unlimited                        | Embed video YouTube (RECOMMENDED - paling mudah!) |
| **Cloudinary**    | 25GB storage + 25GB bandwidth/bulan | Upload gambar & video                             |
| **ImgBB**         | Unlimited gambar                    | Hosting gambar gratis                             |

> 💡 **PALING MUDAH:** Untuk video, cukup upload ke YouTube lalu embed URL-nya. Tidak perlu setup storage sama sekali! Untuk gambar thumbnail, pakai Cloudinary free tier atau ImgBB.

### 2.5 Authentication Services (GRATIS)

| Service              | Keterangan                 | Gratis?           |
| -------------------- | -------------------------- | ----------------- |
| Google Cloud Console | OAuth 2.0 credentials      | ✅ Ya (unlimited) |
| Meta for Developers  | Facebook OAuth credentials | ✅ Ya (unlimited) |

> 💡 **Setup mudah:**
>
> - Google: https://console.cloud.google.com/ → Create Project → APIs & Services → Credentials
> - Facebook: https://developers.facebook.com/ → My Apps → Create App → Facebook Login

### 2.6 Development & Deployment (GRATIS)

| Teknologi   | Keterangan          | Free Tier             |
| ----------- | ------------------- | --------------------- |
| Vite        | Frontend build tool | ✅ Open source        |
| Nodemon     | Backend dev server  | ✅ Open source        |
| **Vercel**  | Frontend deployment | ✅ Unlimited projects |
| **Render**  | Backend deployment  | ✅ 750 hours/bulan    |
| **Railway** | MySQL + Backend     | ✅ $5 credit/bulan    |

> 💡 **Deployment Gratis:**
>
> - Frontend di **Vercel** = gratis unlimited
> - Backend di **Render** = gratis (spin down setelah 15 menit idle, tapi cukup untuk demo)
> - Database di **Railway** = gratis dengan credit bulanan

---

## 🚀 QUICK START (5 MENIT SETUP!)

### Step 1: Clone & Install

```bash
# Clone project
git clone <repo-url>
cd astronacci-trading

# Install dependencies
cd client && npm install
cd ../server && npm install
```

### Step 2: Setup Database (XAMPP)

```bash
# 1. Install XAMPP dari https://www.apachefriends.org/
# 2. Start Apache & MySQL dari XAMPP Control Panel
# 3. Buka http://localhost/phpmyadmin
# 4. Create database: astronacci_trading
```

### Step 3: Setup Environment

```bash
# Copy .env.example ke .env di folder server
cp .env.example .env

# Edit .env dengan credentials kamu
```

### Step 4: Run!

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

🎉 **Done!** Buka http://localhost:5173

---

## 🗄️ 3. DATABASE SCHEMA (SIMPLIFIED)

> 💡 **Hanya 5 tabel!** Disederhanakan agar mudah diimplementasi.

### 3.1 Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  ASTRONACCI TRADING - DATABASE SCHEMA                        │
│                           (5 Tabel Modular)                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐       ┌──────────────────┐
│   MEMBERSHIPS    │       │      USERS       │
├──────────────────┤       ├──────────────────┤
│ id (PK)          │◄──────│ id (PK)          │
│ name             │       │ email            │
│ type (A/B/C)     │       │ password         │
│ article_limit    │       │ full_name        │
│ video_limit      │       │ avatar_url       │
│ created_at       │       │ auth_provider    │
└──────────────────┘       │ provider_id      │
                           │ membership_id(FK)│
                           │ role             │
                           │ created_at       │
                           └────────┬─────────┘
                                    │
                                    │ 1:N
                                    ▼
                    ┌──────────────────────────────┐
                    │     USER_CONTENT_HISTORY     │
                    ├──────────────────────────────┤
                    │ id (PK)                      │
                    │ user_id (FK)                 │
                    │ content_type (article/video) │
                    │ content_id (FK)              │
                    │ accessed_at                  │
                    └──────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
        ┌──────────────────┐            ┌──────────────────┐
        │    ARTICLES      │            │     VIDEOS       │
        │ (Analisis/Research)           │ (Tutorial Trading)│
        ├──────────────────┤            ├──────────────────┤
        │ id (PK)          │            │ id (PK)          │
        │ title            │            │ title            │
        │ content          │            │ description      │
        │ category         │            │ category         │
        │ thumbnail_url    │            │ video_url        │
        │ created_at       │            │ thumbnail_url    │
        └──────────────────┘            │ duration         │
                                        │ created_at       │
                                        └──────────────────┘
```

### 3.2 Tabel Detail (SIMPLIFIED)

#### 1️⃣ USERS

| Column        | Type                                | Description                               |
| ------------- | ----------------------------------- | ----------------------------------------- |
| id            | INT (PK, AUTO_INCREMENT)            | Primary key                               |
| email         | VARCHAR(255) UNIQUE                 | Email pengguna                            |
| password      | VARCHAR(255) NULL                   | Nullable (untuk social login)             |
| full_name     | VARCHAR(100)                        | Nama lengkap                              |
| avatar_url    | VARCHAR(500) NULL                   | URL foto profil                           |
| auth_provider | ENUM('local','google','facebook')   | Provider authentication                   |
| provider_id   | VARCHAR(255) NULL                   | ID dari OAuth provider                    |
| membership_id | INT (FK) DEFAULT 1                  | Reference ke memberships (default Type A) |
| role          | ENUM('user','admin') DEFAULT 'user' | Role user                                 |
| created_at    | TIMESTAMP                           | Waktu pembuatan                           |

#### 2️⃣ MEMBERSHIPS

| Column        | Type                     | Description                    |
| ------------- | ------------------------ | ------------------------------ |
| id            | INT (PK, AUTO_INCREMENT) | Primary key                    |
| name          | VARCHAR(50)              | Nama membership                |
| type          | ENUM('A','B','C')        | Tipe membership                |
| article_limit | INT                      | Batas artikel (-1 = unlimited) |
| video_limit   | INT                      | Batas video (-1 = unlimited)   |
| created_at    | TIMESTAMP                | Waktu pembuatan                |

**Default Data (Seed):**

```sql
INSERT INTO memberships (name, type, article_limit, video_limit) VALUES
('Tipe A - Free', 'A', 3, 3),           -- Akses 3 artikel analisis + 3 video trading
('Tipe B - Basic', 'B', 10, 10),        -- Akses 10 artikel + 10 video
('Tipe C - Premium', 'C', -1, -1);      -- Unlimited semua konten research & trading
```

> 💡 **Konteks Astronacci:**
>
> - **Articles** = Artikel analisis market, research saham, tips trading
> - **Videos** = Video tutorial trading, webinar, analisis teknikal

#### 3️⃣ ARTICLES (Analisis & Research)

| Column        | Type                     | Description                            |
| ------------- | ------------------------ | -------------------------------------- |
| id            | INT (PK, AUTO_INCREMENT) | Primary key                            |
| title         | VARCHAR(255)             | Judul artikel (misal: "Analisis IHSG") |
| content       | TEXT                     | Isi artikel analisis                   |
| category      | VARCHAR(100) NULL        | Kategori (saham, crypto, forex)        |
| thumbnail_url | VARCHAR(500) NULL        | URL gambar thumbnail                   |
| created_at    | TIMESTAMP                | Waktu pembuatan                        |

#### 4️⃣ VIDEOS (Tutorial Trading)

| Column        | Type                     | Description                                  |
| ------------- | ------------------------ | -------------------------------------------- |
| id            | INT (PK, AUTO_INCREMENT) | Primary key                                  |
| title         | VARCHAR(255)             | Judul video (misal: "Cara Baca Candlestick") |
| description   | TEXT NULL                | Deskripsi video                              |
| category      | VARCHAR(100) NULL        | Kategori (teknikal, fundamental, dll)        |
| video_url     | VARCHAR(500)             | URL video YouTube embed                      |
| thumbnail_url | VARCHAR(500) NULL        | URL thumbnail                                |
| duration      | INT NULL                 | Durasi dalam menit                           |
| created_at    | TIMESTAMP                | Waktu pembuatan                              |

#### 5️⃣ USER_CONTENT_HISTORY

| Column       | Type                     | Description        |
| ------------ | ------------------------ | ------------------ |
| id           | INT (PK, AUTO_INCREMENT) | Primary key        |
| user_id      | INT (FK)                 | Reference ke users |
| content_type | ENUM('article','video')  | Tipe konten        |
| content_id   | INT                      | ID artikel/video   |
| accessed_at  | TIMESTAMP                | Waktu akses        |

> 💡 **Tabel ini untuk tracking berapa konten yang sudah diakses user. Simple!**

---

## 🔄 4. ALUR SISTEM (SYSTEM FLOW)

### 4.1 Flow Register dengan Pilih Tipe Membership

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   REGISTER FLOW (PILIH TIPE MEMBERSHIP)                      │
└─────────────────────────────────────────────────────────────────────────────┘

                         ┌─────────────────┐
                         │   LANDING PAGE  │
                         │       /         │
                         └────────┬────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
           ┌────────────────┐          ┌────────────────┐
           │    REGISTER    │          │     LOGIN      │
           │   /register    │          │    /login      │
           └───────┬────────┘          └───────┬────────┘
                   │                          │
    ┌──────────────┼──────────────┐              │
    ▼              ▼              ▼              │
┌────────┐   ┌──────────┐   ┌──────────┐       │
│ Manual │   │  Google  │   │ Facebook │       │
│ Form   │   │  OAuth   │   │  OAuth   │       │
└────┬───┘   └────┬─────┘   └────┬─────┘       │
    │            │              │              │
    └────────────┼──────────────┘              │
                 │                             │
                 ▼                             │
    ┌─────────────────────────────┐              │
    │  PILIH TIPE MEMBERSHIP      │              │
    │  /select-membership         │              │
    │                             │              │
    │  ┌───────┐ ┌───────┐ ┌───────┐ │              │
    │  │Tipe A│ │Tipe B│ │Tipe C│ │              │
    │  │ FREE │ │ BASIC│ │PREMIUM│              │
    │  │ 3+3  │ │ 10+10│ │  ∞+∞ │ │              │
    │  └───────┘ └───────┘ └───────┘ │              │
    └──────────────┬──────────────┘              │
                 │                             │
                 └─────────────┬─────────────┘
                               │
                               ▼
                  ┌─────────────────────────┐
                  │       DASHBOARD           │
                  │      /dashboard           │
                  │                           │
                  │  Akses sesuai tipe:       │
                  │  • Tipe A: 3+3 konten     │
                  │  • Tipe B: 10+10 konten   │
                  │  • Tipe C: Unlimited      │
                  └─────────────────────────┘
```

> 💡 **PENTING:** Tipe membership dipilih SEKALI saat register dan TIDAK BISA DIUBAH.

### 4.2 Flow Register Manual

```
User buka /register
    ↓
Isi form: Email, Password, Nama
    ↓
Submit → Redirect ke /select-membership
    ↓
Pilih Tipe Membership (A/B/C)
    ↓
Simpan user + tipe ke database
    ↓
Generate JWT Token
    ↓
Redirect ke /dashboard
```

### 4.3 Flow Register OAuth (Google/Facebook)

```
User klik "Daftar dengan Google/Facebook"
    ↓
Redirect ke OAuth Provider
    ↓
User login dengan akun Google/Facebook
    ↓
Callback: Cek user sudah ada di DB?
    ↓
├── SUDAH ADA → Generate JWT → Dashboard
│
└── BELUM ADA → Redirect ke /select-membership
                    ↓
                User pilih A/B/C
                    ↓
                Simpan user + tipe
                    ↓
                Generate JWT → Dashboard
```

### 4.4 Flow Login (User Sudah Terdaftar)

```
User buka /login
    ↓
Isi Email + Password ATAU klik Google/Facebook
    ↓
Validasi credentials
    ↓
Generate JWT Token (include membershipType)
    ↓
Redirect ke /dashboard
```

### 4.5 Flow Content Access

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CONTENT ACCESS FLOW                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐                                           ┌─────────────────┐
│    USER     │                                           │    DATABASE     │
│  (Logged)   │                                           │     (MySQL)     │
└──────┬──────┘                                           └────────┬────────┘
       │                                                           │
       │  1. Request Article/Video                                 │
       │ ─────────────────────────────────►                        │
       │                                                           │
       │         ┌────────────────────────────────────────┐        │
       │         │           BACKEND SERVER               │        │
       │         ├────────────────────────────────────────┤        │
       │         │                                        │        │
       │         │  2. Verify JWT Token                   │        │
       │         │         │                              │        │
       │         │         ▼                              │        │
       │         │  3. Get User Membership Type ─────────────────► │
       │         │         │                              │        │
       │         │         ▼                              │        │
       │         │  4. Count Accessed Content ◄───────────────────│
       │         │     (from user_content_history)        │        │
       │         │         │                              │        │
       │         │         ▼                              │        │
       │         │  5. Check Access Limit                 │        │
       │         │         │                              │        │
       │         │    ┌────┴────┐                         │        │
       │         │    ▼         ▼                         │        │
       │         │ ┌─────┐   ┌──────┐                     │        │
       │         │ │ALLOW│   │DENY  │                     │        │
       │         │ └──┬──┘   └──┬───┘                     │        │
       │         │    │         │                         │        │
       │         └────┼─────────┼─────────────────────────┘        │
       │              │         │                                  │
       │              ▼         ▼                                  │
       │ ◄─── 6a. Return    6b. Return                             │
       │      Content       "Limit Tercapai"                       │
       │                                                           │
       │  7. Log Access (if allowed) ─────────────────────────────►│
       │                                                           │
       ▼                                                           ▼


ACCESS LIMIT LOGIC:
┌────────────────────────────────────────────────────────────────┐
│ Membership │ Article Limit │ Video Limit │ Check              │
├────────────┼───────────────┼─────────────┼────────────────────┤
│ Type A     │ 3             │ 3           │ count <= 3         │
│ Type B     │ 10            │ 10          │ count <= 10        │
│ Type C     │ Unlimited     │ Unlimited   │ Always allow       │
└────────────────────────────────────────────────────────────────┘
```

### 4.6 OAuth Flow Detail

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        GOOGLE OAUTH 2.0 FLOW                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌────────┐      ┌────────┐      ┌──────────┐      ┌────────────┐
│  User  │      │Frontend│      │ Backend  │      │Google OAuth│
└───┬────┘      └───┬────┘      └────┬─────┘      └─────┬──────┘
    │               │                │                  │
    │ 1.Click       │                │                  │
    │ "Login Google"│                │                  │
    │──────────────►│                │                  │
    │               │                │                  │
    │               │ 2.Redirect to  │                  │
    │               │ /auth/google   │                  │
    │               │───────────────►│                  │
    │               │                │                  │
    │               │                │ 3.Redirect to    │
    │               │                │ Google Auth URL  │
    │               │                │─────────────────►│
    │               │                │                  │
    │◄──────────────┼────────────────┼──────────────────│
    │           4. Google Login Page                    │
    │                                                   │
    │ 5.Enter Credentials                               │
    │──────────────────────────────────────────────────►│
    │                                                   │
    │               │                │ 6.Callback with  │
    │               │                │ Authorization    │
    │               │                │ Code             │
    │               │                │◄─────────────────│
    │               │                │                  │
    │               │                │ 7.Exchange Code  │
    │               │                │ for Access Token │
    │               │                │─────────────────►│
    │               │                │                  │
    │               │                │◄─────────────────│
    │               │                │ 8.Return Token   │
    │               │                │ + User Info      │
    │               │                │                  │
    │               │                │ 9.Create/Update  │
    │               │                │ User in DB       │
    │               │                │                  │
    │               │                │ 10.Generate JWT  │
    │               │◄───────────────│                  │
    │               │ 11.Redirect    │                  │
    │               │ with JWT       │                  │
    │◄──────────────│                │                  │
    │ 12.Dashboard  │                │                  │
    │               │                │                  │
```

---

## 🏗️ 5. ARSITEKTUR SISTEM

### 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SYSTEM ARCHITECTURE                                 │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────┐
                              │   CLOUDFLARE    │
                              │   (CDN + DNS)   │
                              └────────┬────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    │                                     │
                    ▼                                     ▼
          ┌─────────────────┐                   ┌─────────────────┐
          │    VERCEL       │                   │ RAILWAY/RENDER  │
          │   (Frontend)    │                   │   (Backend)     │
          │                 │                   │                 │
          │  ┌───────────┐  │                   │  ┌───────────┐  │
          │  │  React +  │  │   API Requests    │  │ Express + │  │
          │  │ Tailwind  │──┼──────────────────►│  │ Sequelize │  │
          │  │   App     │  │                   │  │   API     │  │
          │  └───────────┘  │◄──────────────────┼──└───────────┘  │
          │                 │   JSON Response   │        │        │
          └─────────────────┘                   └────────┼────────┘
                                                         │
                    ┌────────────────────────────────────┼────────┐
                    │                                    │        │
                    ▼                                    ▼        ▼
          ┌─────────────────┐                   ┌─────────────────────────┐
          │   CLOUDINARY    │                   │   RAILWAY / PLANETSCALE │
          │   (Media CDN)   │                   │        (MySQL)          │
          │                 │                   │                         │
          │  ┌───────────┐  │                   │  ┌───────────────────┐  │
          │  │  Images   │  │                   │  │  Users Table      │  │
          │  │  Videos   │  │                   │  │  Memberships      │  │
          │  │  Assets   │  │                   │  │  Articles         │  │
          │  └───────────┘  │                   │  │  Videos           │  │
          │                 │                   │  │  Access History   │  │
          └─────────────────┘                   │  └───────────────────┘  │
                                                └─────────────────────────┘

                    ┌─────────────────────────────────────────────┐
                    │              EXTERNAL SERVICES              │
                    ├─────────────────────────────────────────────┤
                    │  ┌─────────────┐      ┌─────────────┐       │
                    │  │   GOOGLE    │      │  FACEBOOK   │       │
                    │  │   OAuth     │      │   OAuth     │       │
                    │  │   2.0 API   │      │   API       │       │
                    │  └─────────────┘      └─────────────┘       │
                    └─────────────────────────────────────────────┘
```

### 5.2 API Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            API LAYER DESIGN                                  │
└─────────────────────────────────────────────────────────────────────────────┘

                         ┌─────────────────────────┐
                         │     EXPRESS SERVER      │
                         │      (Port 5000)        │
                         └───────────┬─────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         │                           │                           │
         ▼                           ▼                           ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   MIDDLEWARE    │       │   MIDDLEWARE    │       │   MIDDLEWARE    │
│                 │       │                 │       │                 │
│  • Helmet       │       │  • CORS         │       │  • Rate Limit   │
│  • Morgan       │       │  • Body Parser  │       │  • Compression  │
└────────┬────────┘       └────────┬────────┘       └────────┬────────┘
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │         ROUTES               │
                    └──────────────┬───────────────┘
                                   │
    ┌──────────────┬───────────────┼───────────────┬──────────────┐
    │              │               │               │              │
    ▼              ▼               ▼               ▼              ▼
┌────────┐   ┌──────────┐   ┌───────────┐   ┌──────────┐   ┌──────────┐
│  Auth  │   │  Users   │   │ Articles  │   │  Videos  │   │  Admin   │
│ Routes │   │  Routes  │   │  Routes   │   │  Routes  │   │  Routes  │
└───┬────┘   └────┬─────┘   └─────┬─────┘   └────┬─────┘   └────┬─────┘
    │             │               │              │              │
    ▼             ▼               ▼              ▼              ▼
┌────────┐   ┌──────────┐   ┌───────────┐   ┌──────────┐   ┌──────────┐
│  Auth  │   │  User    │   │ Article   │   │  Video   │   │  Admin   │
│Controller  │Controller│   │Controller │   │Controller│   │Controller│
└───┬────┘   └────┬─────┘   └─────┬─────┘   └────┬─────┘   └────┬─────┘
    │             │               │              │              │
    └─────────────┴───────────────┼──────────────┴──────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────────┐
                    │        SERVICES              │
                    │   (Business Logic Layer)     │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │     SEQUELIZE ORM / DAL      │
                    │   (Data Access Layer)        │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │        MySQL Database        │
                    └──────────────────────────────┘
```

---

## 📁 6. STRUKTUR FOLDER (MODULAR)

> 💡 **Struktur modular!** Setiap bagian terpisah dengan jelas, mudah di-maintain.

### 6.1 Root Project Structure

```
astronacci-trading/
├── 📁 client/          # Frontend React (Vite + Tailwind)
├── 📁 server/          # Backend Express (Sequelize + MySQL)
├── 📄 .gitignore
└── 📄 README.md
```

### 6.2 Frontend Structure (client/) - MODULAR

```
client/
├── 📁 public/
│   └── 📄 astronacci-logo.svg
│
├── 📁 src/
│   │
│   ├── 📁 components/        # ✅ Komponen Reusable (MODULAR)
│   │   ├── 📁 common/        # Komponen umum
│   │   │   ├── 📄 Button.jsx
│   │   │   ├── 📄 Card.jsx
│   │   │   ├── 📄 Modal.jsx
│   │   │   ├── 📄 Loader.jsx
│   │   │   └── 📄 Badge.jsx
│   │   │
│   │   ├── 📁 layout/        # Layout components
│   │   │   ├── 📄 Navbar.jsx
│   │   │   ├── 📄 Footer.jsx
│   │   │   └── 📄 Sidebar.jsx
│   │   │
│   │   └── 📁 auth/          # Auth-related
│   │       ├── 📄 SocialLoginButtons.jsx
│   │       └── 📄 ProtectedRoute.jsx
│   │
│   ├── 📁 pages/             # ✅ Halaman Utama (MODULAR)
│   │   ├── 📄 Home.jsx              # Landing page Astronacci
│   │   ├── 📄 Login.jsx             # Login page
│   │   ├── 📄 Register.jsx          # Register page
│   │   ├── 📄 SelectMembership.jsx  # Pilih tipe membership
│   │   ├── 📄 Dashboard.jsx         # User dashboard + stats
│   │   ├── 📄 Articles.jsx          # List artikel analisis
│   │   ├── 📄 ArticleDetail.jsx     # Detail artikel
│   │   ├── 📄 Videos.jsx            # List video trading
│   │   ├── 📄 VideoDetail.jsx       # Detail video (YouTube embed)
│   │   └── 📄 Profile.jsx           # Profil user
│   │
│   ├── 📁 context/           # ✅ State Management (MODULAR)
│   │   └── 📄 AuthContext.jsx       # Auth state (user, token, login/logout)
│   │
│   ├── 📁 services/          # ✅ API Calls (MODULAR)
│   │   ├── 📄 api.js                # Axios instance + interceptors
│   │   ├── 📄 authService.js        # Auth API calls
│   │   ├── 📄 articleService.js     # Article API calls
│   │   └── 📄 videoService.js       # Video API calls
│   │
│   ├── 📁 utils/             # ✅ Helper Functions
│   │   ├── 📄 formatDate.js
│   │   └── 📄 constants.js
│   │
│   ├── 📄 App.jsx            # Root component + Routes
│   ├── 📄 main.jsx           # Entry point
│   └── 📄 index.css          # Tailwind imports
│
├── 📄 .env.example
├── 📄 tailwind.config.js
├── 📄 postcss.config.js
├── 📄 vite.config.js
├── 📄 index.html
└── 📄 package.json
```

### 6.3 Backend Structure (server/) - MODULAR

```
server/
├── 📁 config/                # ✅ Konfigurasi (MODULAR)
│   ├── 📄 database.js              # Sequelize connection
│   └── 📄 passport.js              # Google + Facebook OAuth strategies
│
├── 📁 models/                # ✅ Database Models (MODULAR)
│   ├── 📄 index.js                 # Model associations & Sequelize init
│   ├── 📄 User.js                  # User model
│   ├── 📄 Membership.js            # Membership model
│   ├── 📄 Article.js               # Article model
│   ├── 📄 Video.js                 # Video model
│   └── 📄 UserContentHistory.js    # Access tracking model
│
├── 📁 routes/                # ✅ API Routes (MODULAR)
│   ├── 📄 index.js                 # Route aggregator
│   ├── 📄 auth.routes.js           # /api/auth/*
│   ├── 📄 articles.routes.js       # /api/articles/*
│   ├── 📄 videos.routes.js         # /api/videos/*
│   └── 📄 users.routes.js          # /api/users/*
│
├── 📁 controllers/           # ✅ Request Handlers (MODULAR)
│   ├── 📄 auth.controller.js
│   ├── 📄 articles.controller.js
│   ├── 📄 videos.controller.js
│   └── 📄 users.controller.js
│
├── 📁 middleware/            # ✅ Middleware (MODULAR)
│   ├── 📄 auth.js                  # JWT verification
│   └── 📄 checkAccess.js           # Membership access check
│
├── 📁 migrations/            # ✅ Database Migrations
│   ├── 📄 001-create-memberships.js
│   ├── 📄 002-create-users.js
│   ├── 📄 003-create-articles.js
│   ├── 📄 004-create-videos.js
│   └── 📄 005-create-user-content-history.js
│
├── 📁 seeders/               # ✅ Database Seeders
│   ├── 📄 001-seed-memberships.js
│   ├── 📄 002-seed-articles.js
│   └── 📄 003-seed-videos.js
│
├── 📄 .env.example
├── 📄 .sequelizerc           # Sequelize CLI config
├── 📄 app.js                 # Express app setup
├── 📄 server.js              # Entry point
└── 📄 package.json
```

> 💡 **Kenapa Modular?**
>
> - **Mudah di-maintain** - Setiap file punya 1 tanggung jawab
> - **Mudah di-scale** - Tinggal tambah file baru
> - **Mudah di-debug** - Error jelas di file mana
> - **Best practice** - Standar industri

---

## 🔌 7. API ENDPOINTS (SIMPLIFIED)

### 7.1 Authentication Endpoints

| Method | Endpoint                      | Description                        |
| ------ | ----------------------------- | ---------------------------------- |
| POST   | `/api/auth/register`          | Register manual (tanpa tipe)       |
| POST   | `/api/auth/select-membership` | Pilih tipe membership (A/B/C)      |
| POST   | `/api/auth/login`             | Login manual                       |
| GET    | `/api/auth/me`                | Get current user + membership info |
| GET    | `/api/auth/google`            | Login/Register Google              |
| GET    | `/api/auth/google/callback`   | Google callback                    |
| GET    | `/api/auth/facebook`          | Login/Register Facebook            |
| GET    | `/api/auth/facebook/callback` | Facebook callback                  |

### 7.2 Content Endpoints

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/api/articles`     | Get all articles           |
| GET    | `/api/articles/:id` | Get article + check access |
| GET    | `/api/videos`       | Get all videos             |
| GET    | `/api/videos/:id`   | Get video + check access   |

### 7.3 User Endpoints

| Method | Endpoint             | Description      |
| ------ | -------------------- | ---------------- |
| GET    | `/api/users/profile` | Get profile      |
| GET    | `/api/users/stats`   | Get access stats |

> 💡 **Total: ~13 endpoints saja!** Simple dan mudah diimplementasi.

---

## 🔐 8. ENVIRONMENT VARIABLES

### 8.1 Server (.env)

```bash
# Server
PORT=5000
NODE_ENV=development

# MySQL Database (XAMPP default)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=astronacci_trading
DB_USER=root
DB_PASSWORD=

# JWT Secret (buat random string panjang)
JWT_SECRET=rahasia-jwt-kamu-minimal-32-karakter-ya

# Google OAuth (dari console.cloud.google.com)
GOOGLE_CLIENT_ID=95860142104-3ia5c45e5rfvitlv2kmo5s0b3t9h43qn.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Facebook OAuth (dari developers.facebook.com)
FACEBOOK_APP_ID=xxx
FACEBOOK_APP_SECRET=xxx
FACEBOOK_CALLBACK_URL=http://localhost:5000/api/auth/facebook/callback

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### 8.2 Client (.env)

```bash
VITE_API_URL=http://localhost:5000/api
```

> 💡 **Note:** Untuk development lokal dengan XAMPP, password MySQL biasanya kosong.

---

## 📱 9. HALAMAN (PAGES)

| Route                | Deskripsi                         | Auth? |
| -------------------- | --------------------------------- | ----- |
| `/`                  | Landing page Astronacci           | ❌    |
| `/login`             | Login manual + Google/Facebook    | ❌    |
| `/register`          | Register manual + Google/Facebook | ❌    |
| `/select-membership` | Pilih tipe membership (A/B/C)     | ❌\*  |
| `/dashboard`         | Dashboard user + statistik akses  | ✅    |
| `/articles`          | List artikel analisis & research  | ✅    |
| `/articles/:id`      | Detail artikel analisis           | ✅    |
| `/videos`            | List video tutorial trading       | ✅    |
| `/videos/:id`        | Detail video (embed YouTube)      | ✅    |
| `/profile`           | Profil & info membership user     | ✅    |

> 💡 **Total: 10 halaman!**
>
> \*`/select-membership` hanya muncul saat proses register (bukan halaman publik)

---

## 📊 10. MEMBERSHIP ACCESS LOGIC

### 10.1 Access Control Matrix

| Membership           | Artikel Analisis | Video Tutorial | Benefit                        |
| -------------------- | ---------------- | -------------- | ------------------------------ |
| **Tipe A (Free)**    | 3 artikel        | 3 video        | Akses dasar untuk pemula       |
| **Tipe B (Basic)**   | 10 artikel       | 10 video       | Akses lebih untuk trader aktif |
| **Tipe C (Premium)** | Unlimited        | Unlimited      | Full akses semua research      |

### 10.2 Logika Sederhana

```javascript
// Cek akses konten
async function checkAccess(userId, contentType, contentId) {
  const user = await User.findByPk(userId, { include: Membership });

  // Type C = unlimited
  if (user.Membership.type === "C") return { allowed: true };

  // Hitung konten yang sudah diakses
  const accessedCount = await UserContentHistory.count({
    where: { user_id: userId, content_type: contentType },
  });

  const limit =
    contentType === "article"
      ? user.Membership.article_limit
      : user.Membership.video_limit;

  if (accessedCount < limit) {
    // Simpan history akses
    await UserContentHistory.create({
      user_id: userId,
      content_type: contentType,
      content_id: contentId,
    });
    return { allowed: true, remaining: limit - accessedCount - 1 };
  }

  return {
    allowed: false,
    message: "Batas akses tercapai untuk tipe membership Anda",
  };
}
```

---

## 🚀 11. DEPLOYMENT (GRATIS!)

### Development (Lokal)

```
Frontend: http://localhost:5173 (Vite)
Backend:  http://localhost:5000 (Express)
Database: localhost:3306 (XAMPP MySQL)
```

### Production (GRATIS)

```
Frontend: Vercel (gratis unlimited)
Backend:  Render (gratis 750 jam/bulan)
Database: Railway (gratis $5 credit/bulan)
```

> 💡 **Semua GRATIS!** Tidak perlu bayar untuk testing dan demo.

---

## 📝 12. TIMELINE SINGKAT

| Fase   | Waktu  | Tugas                         |
| ------ | ------ | ----------------------------- |
| Setup  | 2 hari | Install semua, setup database |
| Auth   | 3 hari | Login/register + OAuth        |
| Konten | 3 hari | CRUD artikel & video          |
| Polish | 2 hari | Rapikan UI, test              |

**TOTAL: ~10 HARI**

---

## 📚 13. LINK PENTING

**OAuth Setup:**

- Google Console: https://console.cloud.google.com/
- Facebook Developers: https://developers.facebook.com/

**Dokumentasi:**

- React: https://react.dev/
- Tailwind: https://tailwindcss.com/docs
- Express: https://expressjs.com/
- Sequelize: https://sequelize.org/docs/v6/

**Deploy (Gratis):**

- Vercel: https://vercel.com/
- Render: https://render.com/
- Railway: https://railway.app/

---

## 🔧 14. PERINTAH SEQUELIZE

```bash
# Setup awal
npx sequelize-cli init
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

---

---

## ✅ CHECKLIST MODULAR

### Frontend (React + Vite + Tailwind)

- [x] **Komponen Reusable** - Button, Card, Modal, Navbar terpisah
- [x] **Pages Terpisah** - Setiap halaman file sendiri
- [x] **Context API** - State management sederhana & terpusat
- [x] **Services Layer** - API calls di satu file
- [x] **Environment Config** - Variabel di .env

### Backend (Express + Sequelize)

- [x] **Models Terpisah** - Setiap tabel = 1 file model
- [x] **Routes Terpisah** - auth, articles, videos, users
- [x] **Middleware Modular** - auth.js, checkAccess.js
- [x] **Config Terpisah** - database.js, passport.js
- [x] **Migrations & Seeders** - Database versioning

### Database (MySQL)

- [x] **5 Tabel Saja** - Tidak over-engineering
- [x] **Foreign Keys** - Relasi jelas
- [x] **Indexed** - Performance optimal

---

## 🎯 RINGKASAN

| Aspek          | Status | Keterangan                             |
| -------------- | ------ | -------------------------------------- |
| Tema           | ✅     | Astronacci Trading & Research Platform |
| Tech Stack     | ✅     | 100% Gratis (React, Express, MySQL)    |
| Database       | ✅     | 5 tabel, sudah optimal                 |
| Struktur       | ✅     | Modular, mudah maintain                |
| OAuth          | ✅     | Google + Facebook                      |
| Membership     | ✅     | 3 tipe (A=Free, B=Basic, C=Premium)    |
| Pilih Tipe     | ✅     | Saat register (tidak bisa diubah)      |
| Access Control | ✅     | Berdasarkan tipe membership            |

**Alur Singkat:**

```
Register → Pilih Tipe (A/B/C) → Dashboard → Akses Konten (sesuai limit tipe)
```

---

## 🎬 15. DOKUMENTASI VIDEO (DEMO FLOW)

> 💡 **Untuk dokumentasi video, berikut flow yang perlu direkam:**

### Video 1: Register Manual + Pilih Tipe

```
1. Buka halaman /register
2. Isi form (email, password, nama)
3. Submit → redirect ke /select-membership
4. Pilih Tipe A/B/C
5. Submit → redirect ke Dashboard
```

### Video 2: Register Google OAuth + Pilih Tipe

```
1. Buka halaman /register
2. Klik "Daftar dengan Google"
3. Login dengan akun Google
4. Redirect ke /select-membership (user baru)
5. Pilih Tipe A/B/C
6. Submit → redirect ke Dashboard
```

### Video 3: Register Facebook OAuth + Pilih Tipe

```
1. Buka halaman /register
2. Klik "Daftar dengan Facebook"
3. Authorize app
4. Redirect ke /select-membership (user baru)
5. Pilih Tipe A/B/C
6. Submit → redirect ke Dashboard
```

### Video 4: Login (User Sudah Terdaftar)

```
1. Buka halaman /login
2. Login dengan email/password ATAU Google/Facebook
3. Langsung redirect ke Dashboard (tidak pilih tipe lagi)
```

### Video 5: Akses Konten - Tipe A (Limit 3)

```
1. Login sebagai user Tipe A
2. Buka /articles
3. Akses artikel 1 → berhasil
4. Akses artikel 2 → berhasil
5. Akses artikel 3 → berhasil
6. Akses artikel 4 → DITOLAK "Limit tercapai"
7. Sama untuk video
```

### Video 6: Akses Konten - Tipe B (Limit 10)

```
1. Login sebagai user Tipe B
2. Bisa akses hingga 10 artikel + 10 video
3. Artikel ke-11 → DITOLAK
```

### Video 7: Akses Konten - Tipe C (Unlimited)

```
1. Login sebagai user Tipe C
2. Akses artikel & video tanpa batas
3. Tidak ada pesan limit
```

---

**🚀 Siap untuk mulai coding! Platform Astronacci Trading & Research ini sudah terstruktur modular dan 100% GRATIS.**
