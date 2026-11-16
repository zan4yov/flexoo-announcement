# Pengumuman Rekrutmen Flexoo

Halaman pengumuman hasil rekrutmen Flexoo Software House. Pelamar memasukkan NRP, lalu halaman menampilkan ucapan selamat beserta link grup WhatsApp divisinya (diterima) atau "tetap semangat" (tidak diterima).

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Mengisi data hasil

Edit `data/lolos.csv`: satu baris per NRP (10 digit) **yang diterima saja**, dengan kolom `nrp` dan `divisi` (kolom `nama` hanya untuk catatan, tidak ditampilkan). NRP valid lain yang tidak ada di daftar otomatis dianggap tidak diterima.

Nilai `divisi` yang dikenali: `Project Manager`, `UI/UX Designer`, `Frontend Developer`, `Backend Developer`, `Business Development`, `Academy Lead` (dua terakhir = Management Team). Link grup WhatsApp tiap divisi ada di `app/divisi.ts`.

- NRP yang bukan 10 digit, muncul dua kali, atau divisinya tidak dikenal akan membuat pengecekan error, sengaja, supaya salah ketik ketahuan.
- Bisa langsung *Save As → CSV* dari Excel/Google Sheets; pemisah `,` maupun `;` didukung, kolom lain diabaikan.
- File dibaca di server, jadi daftar NRP tidak terkirim ke browser.

## Mengubah teks

Copywriting ada di `app/cek-hasil.tsx`; nama posisi, label tombol, dan link grup ada di `app/divisi.ts`. Warna dan font ada di `app/globals.css` dan `app/layout.tsx`.

## Deploy

Push ke GitHub (sebaiknya repo **private**, karena `data/lolos.csv` berisi daftar NRP), lalu import di Vercel.
