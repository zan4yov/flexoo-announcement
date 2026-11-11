# Pengumuman Rekrutmen Flexoo

Halaman pengumuman hasil rekrutmen Flexoo Software House. Pelamar memasukkan NRP, lalu halaman menampilkan ucapan selamat (lolos) atau "tetap semangat" (tidak lolos).

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Mengisi data hasil

Edit `data/hasil.csv`. Kolom wajib (huruf besar/kecil bebas, urutan bebas):

| nrp        | nama        | hasil   |
|------------|-------------|---------|
| 5025241001 | Nama Lengkap | lolos  |
| 5025241002 | Nama Lengkap | tidak  |

- `hasil` hanya boleh `lolos` atau `tidak`. Nilai lain atau NRP ganda akan membuat pengecekan error, sengaja, supaya salah ketik tidak menampilkan hasil yang keliru.
- Bisa langsung *Save As → CSV* dari Excel/Google Sheets; pemisah `,` maupun `;` didukung.
- File dibaca di server, jadi daftar lengkap pelamar tidak terkirim ke browser.

## Mengubah teks

Semua copywriting ada di `app/cek-hasil.tsx`. Warna dan font ada di `app/globals.css` dan `app/layout.tsx`.

## Deploy

Push ke GitHub (repo **private**, karena `data/hasil.csv` berisi nama pelamar), lalu import di Vercel.
