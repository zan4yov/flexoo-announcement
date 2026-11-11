# Pengumuman Rekrutmen Flexoo

Halaman pengumuman hasil rekrutmen Flexoo Software House. Pelamar memasukkan NRP, lalu halaman menampilkan ucapan selamat beserta info wawancara (lolos) atau "tetap semangat" (tidak lolos).

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Mengisi data hasil

Edit `data/lolos.csv`: kolom `nrp` berisi NRP (10 digit) **yang lolos saja**, satu per baris. NRP valid lain yang tidak ada di daftar otomatis dianggap tidak lolos.

- NRP yang bukan 10 digit atau muncul dua kali akan membuat pengecekan error, sengaja, supaya salah ketik ketahuan.
- Bisa langsung *Save As → CSV* dari Excel/Google Sheets; pemisah `,` maupun `;` didukung, kolom lain diabaikan.
- File dibaca di server, jadi daftar NRP tidak terkirim ke browser.

## Mengubah teks

Semua copywriting ada di `app/cek-hasil.tsx`. Warna dan font ada di `app/globals.css` dan `app/layout.tsx`.

## Deploy

Push ke GitHub (sebaiknya repo **private**, karena `data/lolos.csv` berisi daftar NRP), lalu import di Vercel.
