# Website UMKM Desa Pucung

Sistem sederhana untuk pemberdayaan UMKM Desa Pucung menggunakan WebGIS dan AI digital marketing.

## Struktur Folder

- `index.html` - Halaman Beranda / Landing Page
- `peta.html` - Halaman Peta UMKM dengan Leaflet.js
- `detail.html` - Halaman detail setiap UMKM
- `ai-marketing.html` - Halaman AI Digital Marketing
- `admin.html` - Dashboard admin demo (frontend)
- `css/style.css` - Styling tampilan modern dan responsif
- `js/map.js` - Logika peta Leaflet dan contoh Google Maps Geocoding API
- `js/detail.js` - Load detail UMKM berdasarkan `id`
- `js/ai-tools.js` - Generate caption promosi otomatis
- `js/admin.js` - Demo tambah/edit/hapus data secara lokal
- `data/umkm.json` - Contoh data UMKM dalam format JSON

## Cara Pakai

1. Taruh file di server lokal atau buka `index.html` di browser.
2. Buka `peta.html` untuk melihat peta interaktif UMKM.
3. Klik marker untuk melihat detail setiap UMKM.
4. Buka `ai-marketing.html` untuk membuat caption promosi otomatis.
5. Buka `admin.html` sebagai demo CRUD data lokal.

## Contoh Integrasi Leaflet.js

```js
const map = L.map('map').setView([-7.400, 110.600], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);
```

## Contoh Google Maps API (Geocoding)

```js
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${GOOGLE_MAPS_API_KEY}`;
```

## Data UMKM (JSON)

Contoh data tersedia di `data/umkm.json`.

## Backend PHP + MySQL

1. Impor `database.sql` ke MySQL untuk membuat database `umkm_pucung` dan tabel `umkm`.
2. Sesuaikan konfigurasi database di `api/db.php`:
   - `DB_HOST`
   - `DB_NAME`
   - `DB_USER`
   - `DB_PASS`
3. Jalankan server PHP dari folder proyek:
   - `php -S localhost:8000`
4. (Opsional) Untuk memuat contoh `data/umkm.json` ke database, buka `http://localhost:8000/api/seed.php` atau jalankan melalui command line.
5. Buka browser ke `http://localhost:8000/index.html`.

## Endpoint API

- `GET api/umkm.php` - ambil semua data UMKM
- `GET api/umkm.php?id={id}` - ambil detail UMKM
- `POST api/umkm.php` - tambah data UMKM
- `PUT api/umkm.php` - update data UMKM
- `DELETE api/umkm.php?id={id}` - hapus data UMKM
- `GET api/geocode.php?address={alamat}` - contoh proxy Geocoding Google Maps

## Catatan Geocoding

- Isi `YOUR_API_KEY` di `api/geocode.php` dengan Google Maps Geocoding API key.
- `js/map.js` menggunakan endpoint internal `api/geocode.php` untuk menyembunyikan API key dari frontend.
