# Adriel Panjaitan — Portfolio

Personal portfolio built with React + Vite. Black & white, minimal, futuristic.

## Jalankan lokal
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # output ke dist/
```

## Deploy ke Vercel
1. Push folder ini ke repo GitHub baru (mis. `Swaemurd/portfolio`).
2. Buka vercel.com → **Add New… → Project** → import repo tersebut.
3. Vercel otomatis deteksi **Vite**: Build Command `npm run build`, Output `dist`. Klik **Deploy**.

Atau lewat CLI: `npm i -g vercel` lalu `vercel` di folder ini.

## Edit konten
Semua teks (bio, skill, project, timeline, link) ada di `src/data.js`.
Gambar ada di `public/img/`. Mau tambah project: tambah satu objek di `featured` atau `moreProjects`.
