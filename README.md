# ASTRONACCI - Trading & Research Platform

Platform web fullstack untuk edukasi trading dan research pasar finansial. Aplikasi ini menyediakan akses ke artikel analisis market dan video tutorial trading berdasarkan level membership pengguna.

## Fitur

- **Multi-Provider Authentication** - Login dengan email/password, Google, atau GitHub
- **Account Linking** - Link beberapa akun OAuth ke satu akun (dengan konfirmasi user)
- **Membership System** - 3 tipe membership (Free, Basic, Premium) dengan batasan akses konten
- **Smart Access Control** - Konten yang sudah dibaca/ditonton tidak mengurangi kuota lagi
- **Content History** - Lihat riwayat artikel dan video yang sudah diakses
- **Search & Filter** - Cari konten berdasarkan judul atau kategori

## Tech Stack

**Frontend:** React.js 18, Vite, Tailwind CSS, Framer Motion, Context API

**Backend:** Node.js, Express.js, MySQL, Sequelize ORM, Passport.js, JWT (stored in HTTP-only cookies)

## Cara Setup

### Yang Harus Diinstall Dulu

- Node.js (v16+)
- MySQL (v8+)
- Git

Cek udah terinstall belum:

```bash
node --version
npm --version
mysql --version
```

### 1. Clone Project

```bash
git clone <repository-url>
cd Astronacci_fullstack_test
```

### 2. Setup Database

Buka MySQL (terminal atau Workbench), lalu:

```sql
CREATE DATABASE astronacci_db;
```

Kalo mau pake user khusus (optional):

```sql
CREATE USER 'astronacci_user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON astronacci_db.* TO 'astronacci_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Setup Backend

```bash
cd server
npm install
```

Bikin file `.env` di folder `server`:

```env
DB_HOST=localhost
DB_USER=astronacci_user
DB_PASSWORD=password123
DB_NAME=astronacci_db
DB_DIALECT=mysql

JWT_SECRET=your-secret-key-ganti-ini
PORT=5000
CLIENT_URL=http://localhost:5173

# OAuth (optional, pake xxx kalo ga dipake)
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

FACEBOOK_APP_ID=xxx
FACEBOOK_APP_SECRET=xxx
FACEBOOK_CALLBACK_URL=http://localhost:5000/api/auth/facebook/callback

GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback
```

Jalankan migrations & seeders:

```bash
npx sequelize-cli db:migrate
node run-seeders.js
npm run dev
```

Server jalan di `http://localhost:5000`

### 4. Setup Frontend

Buka terminal baru:

```bash
cd client
npm install
```

Bikin file `.env` di folder `client`:

```env
VITE_API_URL=http://localhost:5000/api
```

Jalankan:

```bash
npm run dev
```

Frontend jalan di `http://localhost:5173`

### 5. Mulai Pake Aplikasi

1. Buka browser: `http://localhost:5173`
2. Register akun baru
3. Login
4. Pilih membership
5. Done!

## Troubleshooting

**Database ga konek**

- Cek MySQL udah jalan belum
- Cek username/password di `.env`
- Pastikan database `astronacci_db` udah dibuat

**Port udah dipake**

- Tutup aplikasi yang pake port 5000 atau 5173
- Atau ganti PORT di config

**Error npm install**

- Hapus `node_modules` sama `package-lock.json`
- `npm install` lagi

**OAuth ga jalan**

- OAuth optional kok, bisa pake email/password aja
- Kalo mau aktifin OAuth, daftar app dulu di provider (Google/GitHub/Facebook)

## Membership Types

- **Free (Tipe A)** - 3 artikel + 3 video gratis
- **Basic (Tipe B)** - 10 artikel + 10 video (Rp 99K/bulan)
- **Premium (Tipe C)** - Unlimited semua konten (Rp 199K/bulan)

## Struktur Project

```
server/
  ├── config/       - Database & passport config
  ├── controllers/  - Business logic
  ├── middleware/   - Auth & access control
  ├── models/       - Database models
  ├── routes/       - API endpoints
  ├── migrations/   - Database schema
  └── seeders/      - Initial data

client/
  ├── src/
  │   ├── components/  - Reusable components
  │   ├── pages/       - Page components
  │   ├── services/    - API services
  │   ├── context/     - Global state
  │   └── utils/       - Helper functions
  └── public/          - Static files
```

├── client/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Page components
│ │ ├── services/ # API calls
│ │ ├── context/ # Global state
│ │ └── utils/ # Helper functions
│ └── public/ # Static assets
└── README.md

```

---

## 🎯 Fitur Yang Sudah Diimplementasikan

- ✅ Multi-provider authentication (Email, Google, GitHub)
- ✅ Account linking dengan konfirmasi user
- ✅ Sistem membership bertingkat (Free/Basic/Premium)
- ✅ Smart access control (konten yang sudah diakses tidak mengurangi kuota)
- ✅ Content history tracking (lihat artikel/video yang sudah dibaca/ditonton)
- ✅ Badge "Sudah Dibaca/Ditonton" pada konten
- ✅ Dashboard dengan statistik penggunaan
- ✅ Search & filter untuk artikel dan video
- ✅ Responsive design (mobile-friendly)

---

## 📞 Kontak & Support

Jika mengalami kesulitan dalam setup, silakan hubungi tim development atau buat issue di repository.

**Happy Coding! 🚀**

```
