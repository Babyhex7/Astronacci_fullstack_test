# 🚀 ASTRONACCI - Trading & Research Platform

## Tentang Aplikasi

**Astronacci** adalah platform web fullstack untuk edukasi trading dan research pasar finansial. Platform ini menyediakan akses ke artikel analisis market dan video tutorial trading yang dapat diakses berdasarkan level membership pengguna. Aplikasi dibangun dengan arsitektur modern yang memisahkan frontend (React) dan backend (Node.js/Express) secara jelas.

---

## Fitur Utama

### 1. Multi-Provider Authentication

Sistem autentikasi yang fleksibel memungkinkan pengguna untuk login menggunakan berbagai metode. Saat ini tersedia login dengan **Email/Password** (registrasi manual), **Google OAuth**, dan **GitHub OAuth**. Login dengan **Facebook** sedang dalam proses review oleh Meta dan akan segera tersedia - ketika user mengklik tombol Facebook, akan muncul notifikasi untuk menggunakan metode login lain.

### 2. Account Linking (Best Practice)

Ketika user login dengan OAuth provider berbeda tetapi menggunakan email yang sama (misalnya sudah terdaftar dengan Google, lalu login dengan GitHub), sistem tidak akan otomatis menggabungkan akun. Sebaliknya, user akan diarahkan ke halaman konfirmasi untuk memutuskan apakah ingin menautkan akun tersebut. Pendekatan ini mengikuti best practice industri untuk keamanan dan transparansi.

### 3. Sistem Membership Bertingkat

Aplikasi memiliki tiga tipe membership: **Free (Tipe A)** dengan akses 3 artikel dan 3 video gratis, **Basic (Tipe B)** dengan akses 10 artikel dan 10 video seharga Rp 99K/bulan, dan **Premium (Tipe C)** dengan akses unlimited ke semua konten seharga Rp 199K/bulan. User memilih membership saat pertama kali mendaftar dan tidak dapat diubah.

### 4. Smart Access Control

Sistem access control yang cerdas memastikan konten yang sudah pernah diakses user tidak akan mengurangi kuota lagi saat diakses ulang. Misalnya, user Free yang sudah membaca 3 artikel dapat membaca ulang artikel tersebut kapan saja tanpa terkena batasan. User Premium otomatis bypass semua limit.

---

## Tech Stack

**Frontend** menggunakan React.js 18 dengan Vite sebagai build tool untuk development yang cepat. Styling menggunakan Tailwind CSS untuk konsistensi design, dan Framer Motion untuk animasi yang smooth. State management menggunakan React Context API untuk mengelola autentikasi global.

**Backend** dibangun dengan Node.js dan Express.js sebagai framework. Database menggunakan MySQL dengan Sequelize sebagai ORM. Autentikasi menggunakan Passport.js untuk OAuth dan JWT untuk token-based authentication. Yang unik, JWT token disimpan dalam HTTP-only cookie (bukan localStorage) untuk keamanan yang lebih baik terhadap serangan XSS.

---

## Alur Aplikasi

### Registrasi & Login

User dapat mendaftar dengan mengisi form email/password atau menggunakan OAuth (Google/GitHub). Setelah berhasil login, jika user baru, mereka akan diarahkan ke halaman pemilihan membership. Setelah memilih membership, user mendapat akses ke dashboard dan konten sesuai tipe membership mereka.

### Akses Konten

Ketika user ingin mengakses artikel atau video, sistem akan memeriksa: (1) apakah user sudah login, (2) apakah konten sudah pernah diakses sebelumnya, (3) apakah masih dalam batas kuota membership. User Premium selalu diizinkan tanpa pengecekan limit.

---

## Keamanan

Aplikasi mengimplementasikan beberapa lapisan keamanan. **HTTP-only Cookie** digunakan untuk menyimpan JWT token sehingga tidak dapat diakses JavaScript (mencegah XSS). **Password Hashing** menggunakan bcryptjs untuk menyimpan password secara aman. **CORS** dikonfigurasi dengan origin spesifik dan credentials. **Account Linking** memerlukan konfirmasi user sebelum menggabungkan akun OAuth.

---

## Cara Menjalankan

### Backend

```bash
cd server
npm install
# Buat file .env dengan konfigurasi database dan OAuth
node run-seeders.js
npm run dev
```

### Frontend

```bash
cd client
npm install
# Buat file .env dengan VITE_API_URL=http://localhost:5000/api
npm run dev
```

Akses aplikasi di `http://localhost:5173`

---

## Status OAuth Providers

| Provider | Status    | Keterangan                               |
| -------- | --------- | ---------------------------------------- |
| Google   | ✅ Aktif  | Fully functional                         |
| GitHub   | ✅ Aktif  | Fully functional                         |
| Facebook | 🔄 Segera | Dalam review Meta, UI menampilkan notice |

---

## Author

**Astronacci Team**  
📍 Menara Bank Mega, Lantai 7, Jl. Kapten Tendean Kav 12-14A, Jakarta Selatan  
📧 info@astronacci.com | 📞 (021) 7918 1888
