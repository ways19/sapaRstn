# SAPA RSTN (Sistem Aplikasi Pasien RSUD R.A.A. Tjokronegoro)

Aplikasi Portal Layanan Pasien Digital Resmi **RSUD R.A.A. Tjokronegoro Purworejo** berbasis Progressive Web App (PWA), Vue 3, Vite, dan TailwindCSS.

---

## 🚀 Fitur Versi 1.2.2-20261118 *(Versi Terbaru)*

Pembaruan versi **1.2.2-20261118** menghadirkan pembaruan estetika antarmuka dashboard utama dengan ikon kustom modern (gaya squircle 4x3), penguatan arsitektur & keamanan integrasi modul **e-Consent (Persetujuan Umum Digital)**, perlindungan berlapis (*Defense in Depth*) terhadap serangan XSS dan pencurian data sesi, serta sanitasi konten dinamis:

### 1. 🎨 Redesain Modern 12 Ikon Menu Dashboard (Grid 4 × 3 Squircle Style)
- **Desain Squircle Pebble Organik**: Seluruh 12 kartu menu pada dashboard utama kini menggunakan bentuk squircle modern (`rounded-[22px]`) dengan warna latar pastel lembut (*soft pastel tint*) dan garis tepi aksen (*accent border*) yang presisi dan elegan.
- **Ikon Kustom High-Precision SVG**:
  1. **Daftar Online**: Lembar dokumen dengan badge lingkaran tambah (`+`) di sudut kanan bawah.
  2. **Jadwal Dokter**: Kalender binder rings dengan badge lingkaran jam analog.
  3. **Reservasi**: Papan berkas (*clipboard*) dengan centang dan badge lingkaran centang.
  4. **e-Consent**: Lambang perisai pelindung dengan badge lingkaran centang (`✓`).
  5. **Antrean Apotek**: Botol obat sirup dengan penutup dan lambang palang farmasi.
  6. **Radiologi**: Frame bujur sangkar rontgen dengan 8 garis pancaran radiasi sinar-X.
  7. **Laboratorium**: Tabung reaksi kimia *Erlenmeyer* dengan batas cairan & gelembung.
  8. **Resume Medis**: Map berkas (*medical folder*) dengan lambang palang kesehatan.
  9. **Tagihan**: Bukti kuitansi/nota berigi dengan koin badge berlabel **Rp**.
  10. **Info Kamar**: Ranjang rawat inap lengkap dengan bantal & tiang infus.
  11. **Edukasi**: Buku terbuka dua halaman dengan pita pembatas bacaan di atas.
  12. **Profile**: Ikon profil avatar pengguna modern yang terhubung langsung ke manajemen akun & data pasien.
- **Tata Letak Simetris**: Grid 4 kolom konsisten (`grid-cols-4`) dengan jarak proporsional sehingga selalu menghasilkan 3 baris simetris di ponsel maupun desktop.

### 2. ✍️ Peningkatan Arsitektur & Keamanan Modul e-Consent (Persetujuan Umum Digital)
- **Normalisasi Database & Penghapusan Kolom Redundan**:
  - Migrasi dan pembersihan 9 kolom redundan pada tabel `medicalrecord.rstn_general_consent`:
    - Pemetaan `PETUGAS_NIP` ke kode pengguna `aplikasi.pengguna.ID` (`PETUGAS_ID`), sehingga identitas nama dan NIP resmi petugas admisi terambil dinamis via relasi langsung.
    - Penghapusan kolom penandatangan duplikat (`PENANDATANGAN_NAMA`, `PENANDATANGAN_HUBUNGAN`, `PENANDATANGAN_ALAMAT`, `PENANDATANGAN_TELP`) karena telah terhubung dinamis ke master data pasien (`master.pasien`) atau penanggung jawab pendaftaran (`pendaftaran.penanggung_jawab_pasien`).
    - Penghapusan kolom penyimpanan ganda (`DOCUMENT_STORAGE_ID`, `DOCUMENT_PATH`, `REVISION_FROM`) yang kini terpusat dan terkelola langsung di tabel `document-storage.document` berbasis relasi `DOC_UUID`.
- **Pengamanan Sesi & Token Autentikasi e-Consent**:
  - Token JWT pasien (`sapa_token`) dan profil pasien (`sapa_user`) yang digunakan saat otentikasi e-Consent kini dienkripsi secara aman menggunakan AES-256 Vault di sisi klien (`secureStorage.js`) untuk mencegah pencurian token melalui inspeksi fisik/DevTools.
  - Pengecekan otomatis masa aktif token (`isJwtExpired`) dan mekanisme pembersihan sesi (*auto-clear*) saat token kedaluwarsa atau terjadi pencabutan akses oleh rumah sakit.
  - Penguatan proteksi **IDOR (*Insecure Direct Object References*)** pada API e-Consent, menjamin pasien hanya dapat melihat dan menandatangani dokumen persetujuan yang cocok dengan No. RM miliknya.
- **Sinkronisasi Alur Hybrid Push e-Consent**:
  - Penyelarasan alur kerja antara modul petugas admisi SIMGoS dan modul SAPA RSTN di ponsel pasien: saat petugas mengirim permintaan tanda tangan, pasien dapat seketika meninjau dokumen, klausul pelepasan informasi, dan membubuhkan TTE digital secara aman.

### 3. 🛡️ Penguatan Keamanan Berlapis (Defense in Depth) & Sanitasi XSS
- **Sanitasi HTML dengan DOMPurify**: Pemasangan pustaka `dompurify` pada modul tampilan konten dinamis (khususnya *EdukasiDetailView.vue*) untuk mencegah serangan Cross-Site Scripting (XSS).
- **Derivasi Kunci Multi-Faktor di `secureStorage.js`**: Kunci enkripsi AES penyimpanan lokal klien kini dibentuk secara dinamis melalui kombinasi origin domain, bahasa sistem, dan platform klien yang di-hash dengan SHA-256 (mempersulit reverse-engineering atau analisis statis).
- **Kompatibilitas Mundur (Backward Compatibility)**: Mekanisme dekripsi berjenjang otomatis mengenali dan mendekripsi data sesi versi legacy secara transparan tanpa memutus sesi pasien yang sedang aktif.
- **Content Security Policy (CSP)**: Penambahan deklarasi kebijakan keamanan CSP pada `index.html` untuk membatasi sumber eksekusi skrip liar di browser.

### 4. 🧪 Kualitas Kode & Pengujian Otomatis
- **100% Unit Test Passed**: Sebanyak **146 pengujian otomatis** lulus sempurna pada suite Vitest (`npm run test:run`).
- **Optimalisasi PWA Build**: Kompilasi produksi Vite selesai di bawah 1 detik dengan Service Worker PWA diperbarui.

---

## 📦 Fitur Versi 1.2.1-20261112

Pembaruan versi **1.2.1-20261112** (commit `6bc3547` & `23b3e1c`) berfokus pada resolusi kendala pemuatan gambar edukasi, penambahan indikator versi dinamis pada antarmuka login, serta peningkatan mekanisme caching Service Worker:

### 1. 🖼️ Perbaikan Gambar Edukasi (Resolusi Mixed Content HTTPS)
- **Migrasi Domain Gambar ke HTTPS**: Mengalihkan URL dasar gambar edukasi dari IP mentah HTTP (`http://194.169.46.193/...`) ke domain HTTPS resmi (`https://apirstjokro.purworejokab.go.id/...`) agar gambar artikel tidak diblokir browser modern akibat pelanggaran *Mixed Content*.
- **Otomatisasi Normalisasi Path**: Penambahan utilitas pembersih string `edukasiImgUrl` yang secara cerdas mendeteksi dan mengonversi link gambar absolut maupun relatif dari respons backend.

### 2. 🏷️ Informasi Versi Dinamis Aplikasi di Layar Login
- **Display Versi Real-time**: Menampilkan label versi aplikasi resmi (`SAPA RSTN v1.2.x`) di bagian footer layar login (`LoginPage.vue`).
- **Plugin Manifest `version.json`**: Penambahan custom Vite plugin untuk membuat file manifest `version.json` secara otomatis saat proses build, memudahkan pelacakan versi build produksi oleh tim pengembang.
- **Konstanta Build Global**: Pendefinisian variabel kompilasi global `__APP_VERSION__` dan `__APP_BUILD_ID__` pada `vite.config.js`.

### 3. ⚙️ Peningkatan PWA & Auto-Update Service Worker
- **Pembaruan Konfigurasi Workbox**: Mengaktifkan `cleanupOutdatedCaches: true`, `skipWaiting: true`, dan `clientsClaim: true` agar aplikasi PWA yang terpasang di perangkat pasien langsung memperbarui aset tanpa harus membersihkan cache secara manual.
- **Bypass Cache API**: Menerapkan `navigateFallbackDenylist` untuk rute API dan manifest version.

### 4. 🐛 Perbaikan Bug Fungsional
- Penyempurnaan utilitas reservasi online (`src/utils/reservasi.js`), perbaikan status antrean obat di Instalasi Farmasi (`AntrianFarmasiView.vue`), serta optimasi komponen Dashboard dan Riwayat Reservasi.

---

## 📦 Fitur Versi 1.2.0-20261109

Pembaruan versi 1.2.0-20261109 menghadirkan penyempurnaan besar pada pengalaman pengguna (UX) modul reservasi rawat jalan, integrasi cerdas BPJS Kesehatan Mobile JKN, standarisasi kebijakan operasional pendaftaran 7 hari, serta dukungan Tanda Tangan Elektronik (TTE) pasien:

### 1. 🌿 Redesain Riwayat Reservasi (1-Card Layout) & Integrasi BPJS Kesehatan
- **1-Card Banner Terpadu**: Menggabungkan header judul riwayat reservasi dan modul integrasi BPJS Kesehatan menjadi satu kartu banner yang kompak, bersih, dan elegan dengan identitas gradasi hijau zamrud resmi BPJS Kesehatan (`from-emerald-800 via-teal-800 to-emerald-900`).
- **Deteksi Otomatis Perangkat (Smart Device Detection)**: Tombol *"Buka Mobile JKN"* secara otomatis mendeteksi sistem operasi pengguna. Pengguna **iOS (iPhone/iPad)** diarahkan ke **Apple App Store**, sedangkan pengguna **Android** diarahkan ke **Google Play Store**.
- **Nomor Antrean Bersih & Simetris**: Menghilangkan teks kecil berdesakan di bawah nomor antrean, menjadikan bentuk squircle antrean 1:1 lebih rapi dan nyaman dibaca.
- **Estimasi Jam Pelayanan di Detail Tiket**: Informasi jam estimasi pelayanan pasien (`09:50 WIB` / rentang jam praktik) kini disajikan lengkap dan resmi pada modal detail tiket Bukti Pendaftaran Rawat Jalan.
- **Pembaruan Edukasi Masa Aktif Rujukan BPJS**: Pembaruan redaksi panduan rujukan: *"Pastikan surat rujukan dari Puskesmas/Klinik Anda masih berstatus aktif (berlaku maksimal 90 hari) sebelum berobat."*

### 2. 🎯 Pengurutan Multi-Tier Cerdas Kartu Reservasi
- **Tier 0 (Layanan Hari H)**: Kunjungan pelayanan hari ini selalu ditempatkan di posisi **paling atas** untuk kemudahan akses saat pasien berada di rumah sakit.
- **Tier 1 (Jadwal Mendatang)**: Kunjungan di masa mendatang diurutkan secara **Ascending** (tanggal terdekat lebih dulu).
- **Tier 2 (Riwayat Selesai/Terlewat)**: Kunjungan masa lalu otomatis dikelompokkan di bagian bawah secara **Descending** (tanggal terbaru lebih dulu).

### 3. 📅 Penyesuaian Kuota & Batas Waktu Reservasi Online (Kebijakan 7 Hari)
- Penyesuaian batas maksimal pemilihan tanggal pendaftaran online dari semula 30 hari kalender menjadi **maksimal 7 hari ke depan** sesuai kebijakan operasional pelayanan dan akurasi jadwal dokter RSUD R.A.A. Tjokronegoro.

### 4. ✍️ Dukungan Tanda Tangan Elektronik (TTE) & Geolocation Pasien
- Integrasi formulir persetujuan umum (*General Consent*) pasien dengan tanda tangan digital canvas interaktif.
- Perekaman koordinat lokasi GPS (*Geolocation Permission*) pada saat penandatanganan dokumen guna memperkuat validitas dan otentisitas rekam medis digital.

### 5. 🧪 Kualitas Kode & Pengujian Otomatis
- **100% Unit Test Passed**: 140 pengujian otomatis lulus dengan Vitest (`npm run test:run`).
- **Optimalisasi PWA Build**: Kompilasi Vite production selesai di bawah 2 detik dengan Service Worker PWA terdaftar sempurna.

---

## 📦 Fitur Versi 1.1.1-20260826

Pembaruan versi 1.1.1-20260826 berfokus pada kompatibilitas penuh perangkat iOS/iPhone, akurasi tiket pendaftaran, penyempurnaan alur reservasi, dan performa:

### 1. 🍏 Direct PDF Download & Safari Native Viewer untuk iPhone / iPad (iOS)
- **Tombol Direct Download Khusus iOS**: Pada modul **Hasil Radiologi**, **Hasil Laboratorium**, dan **Resume Medis**, tombol di perangkat iPhone otomatis berlabel **"Unduh Hasil"** / **"Unduh Resume"**.
- **Dekripsi Background Tanpa Layar Preview**: Sekali klik, berkas otomatis diambil dan didekripsi di latar belakang, lalu seketika membuka PDF native di tab Safari / Files tanpa perlu masuk ke halaman pratinjau.
- **Polyfill & Safari WebKit Compatibility**: Penambahan polyfill `Promise.withResolvers`, penanganan transfer ArrayBuffer aman (*non-detached*), dan pembatasan alokasi memori canvas (*pixelRatio clamping*) guna mencegah crash WebKit pada browser Safari.

### 2. 🎟️ Sinkronisasi Akurasi Tiket Pendaftaran Online
- **Sinkronisasi Data Resmi Database**: Memperbaiki tampilan modal pendaftaran berhasil agar seketika mengambil nomor antrian, kode booking, dan detail dokter resmi dari database RS (menggantikan fallback dummy).
- **Akurasi QR Code**: QR Code pendaftaran yang keluar di modal langsung cocok 100% dengan data yang terbaca di mesin scanner APM RSUD dan menu Riwayat Reservasi.

### 3. 🔍 Penyempurnaan UX Modal Reservasi & Ketentuan Kehadiran
- **Navigasi & Penutupan Modal yang Fleksibel**: Penambahan tombol tutup `(X)` di kanan atas modal, penutupan via klik backdrop luar, tombol "Tutup / Selesai", dan *responsive scroll container* (`max-h-[90vh]`) untuk layar ponsel kecil.
- **Pembaruan Kalimat Ketentuan Kehadiran**: *"Pasien diharapkan hadir paling lambat 15 menit sebelum jam operasional pendaftaran ditutup untuk melakukan konfirmasi di Mesin APM atau Loket Pendaftaran Rawat Jalan."*

### 4. ⚡ Optimalisasi Profil & PWA Production
- **Pembersihan Request Redundan**: Menghilangkan panggilan API profil yang tidak perlu, data profil dipetakan langsung dari respon login token.
- **Konfigurasi Produksi**: Pengaturan PWA production build, penonaktifan service worker dev-caching, dan aturan Apache `.htaccess` untuk SPA rewrite mode.

---

## 📦 Fitur Versi 1.1.0

### 1. 📋 Resume Medis Rawat Inap
- **Akses Riwayat Rawat Inap**: Mengambil daftar riwayat perawatan rawat inap pasien (`GET /resume-medis/list-ranap`).
- **Informasi Kartu**: Menampilkan **No. Daftar**, nama **DPJP**, **Tanggal Daftar / Periode Rawat**, ruangan perawatan, serta status validasi resume.
- **Dekripsi Dokumen PDF**: Membuka dan mendekripsi berkas ringkasan pulang resmi dokter (`GET /resume-medis/view-resume?idReg=...`).
- **Flash Message Warning**: Notifikasi instan jika berkas belum selesai divalidasi oleh DPJP.

### 2. 🧪 Hasil Laboratorium
- **Riwayat Pemeriksaan Lab**: Mengambil arsip riwayat uji laboratorium pasien (`GET /hasil-laboratorium/list-pemeriksaan`).
- **Viewer PDF Terdekripsi**: Dekripsi dokumen hasil tes laboratorium secara otomatis (`GET /hasil-laboratorium/view-hasil?noKunjungan=...`).
- **Pemberitahuan Konfirmasi**: Flash message jika hasil tes masih dalam proses verifikasi analis di Instalasi Laboratorium.

### 3. 🩻 Hasil Radiologi
- **Daftar Ekspertise Radiologi**: Mengambil data arsip rontgen/USG/CT-Scan (`GET /hasil-radiologi/list-pemeriksaan`).
- **Paginasi & Dekripsi Berkas**: Pembacaan hasil ekspertise dokter spesialis radiologi (`GET /hasil-radiologi/view-bacaan?acsn=...`).

### 4. 📄 Interactive Canvas PDF Viewer & Gestur Touchscreen
- **Touchscreen Pinch-to-Zoom (2 Jari)**: Rentangkan atau cubit layar untuk memperbesar (*zoom in*) atau memperkecil (*zoom out*) dokumen PDF secara real-time dan mulus.
- **Double-Tap to Zoom**: Ketuk 2x untuk memperbesar cepat ke 2.0x atau mengembalikan ke ukuran pas (*Fit to screen*).
- **Smooth Step Zooming**: Tombol perbesar/perkecil bertahap halus (+/- 10%) berbasis akselerasi grafis 60 FPS dan *debounced crisp canvas re-rendering*.
- **Aksi Dokumen**: Fitur **Unduh PDF** (`.pdf`) dan **Bagikan** (*Web Share API* untuk WhatsApp/Email).

### 5. ⚡ Infinite Scroll
- Pengguliran data tanpa batas berbasis `IntersectionObserver` pada modul Resume Medis, Hasil Laboratorium, dan Hasil Radiologi.
- Penanganan data tanpa duplikasi dan indikator status muat data.

### 6. 🛡️ Canvas Captcha & Keamanan Login
- **Canvas Captcha**: Alfanumerik 6-karakter acak dengan efek rotasi teks, *blur*, dan garis/titik distorsi di sisi front-end.
- **Enkripsi AES-256-CBC**: Dekripsi dokumen rekam medis langsung di sisi klien menggunakan CryptoJS.
- **JWT Authentication**: Proteksi rute dan *interceptor bearer token* otomatis.

### 7. ⏱️ Sinkronisasi Jadwal & Aturan Cutoff Jam 9 Pagi
- Sinkronisasi otomatis tanggal dan dokter dari jadwal poliklinik ke formulir pendaftaran online.
- Aturan Cutoff 09:00 WIB: Pemberitahuan otomatis untuk memilih tanggal berikutnya jika reservasi dilakukan di hari H setelah jam 9 pagi.

---

## 📱 Fitur Versi 1.0.0 *(Initial Release)*

Fitur fondasi utama sistem pendaftaran dan informasi mandiri pasien:

### 1. 🔐 Autentikasi & Akun Pasien
- Login menggunakan Nomor Rekam Medis (No. RM) dan Tanggal Lahir pasien.
- Profil Pasien (Nama, NIK, No. RM, Jenis Kelamin, Tanggal Lahir, Alamat) dan manajemen sesi.

### 2. 📅 Jadwal Dokter Poliklinik
- Jadwal dokter spesialis per poliklinik/hari dengan fitur pencarian interaktif.

### 3. 📝 Pendaftaran Online (Reservasi Rawat Jalan)
- Pendaftaran mandiri untuk pasien **BPJS Kesehatan** dan **Pasien Umum/Bayar Sendiri**.
- Pemilihan tanggal kunjungan, poliklinik tujuan, dokter spesialis, dan validasi rujukan.
- Bukti booking dengan Barcode dan QR Code untuk *check-in* mandiri di rumah sakit.

### 4. 📋 Riwayat Reservasi Pasien
- Daftar riwayat pendaftaran rawat jalan dengan status (Aktif, Selesai, Batal, Kedaluwarsa) serta fitur pembatalan mandiri.

### 5. 💊 Antrian Farmasi
- Pelacakan status penyiapan resep obat di Instalasi Farmasi secara *real-time*.

### 6. 🛏️ Informasi Ketersediaan Tempat Tidur (Kamar)
- Pantauan kapasitas dan sisa kamar rawat inap realtime per kelas perawatan.

### 7. 📰 Edukasi Kesehatan & PWA
- Artikel tips kesehatan resmi dan dukungan PWA (*Add to Home Screen*).

---

## 🛠️ Stack Teknologi:
- **Framework**: [Vue 3](https://vuejs.org/) (Composition API `<script setup>`)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [Vue Router 4](https://router.vuejs.org/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **Kriptografi**: CryptoJS (AES-256-CBC)
- **PDF Engine**: PDF.js (`pdfjs-dist`) & HTML5 Canvas
- **PWA**: `vite-plugin-pwa`

---

## 💻 Panduan Menjalankan Aplikasi:

```bash
# Install dependencies
npm install

# Jalankan server development
npm run dev

# Build untuk production
npm run build
```
