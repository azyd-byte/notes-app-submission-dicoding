# 📝 Notes App

Aplikasi pencatatan berbasis web modern yang dibangun dengan pendekatan **Vanilla JavaScript** dan **Web Components**. Project ini menunjukkan implementasi integrasi RESTful API dengan pengelolaan state yang bersih serta performa yang dioptimalkan menggunakan **Webpack**.

## 🚀 Fitur Utama

- ✨ **Tambah Catatan:** Membuat catatan baru dengan judul dan isi secara real-time.
- 📋 **Daftar Catatan:** Menampilkan semua catatan aktif dalam tata letak yang rapi.
- 🗑️ **Hapus Catatan:** Menghapus catatan yang sudah tidak diperlukan.
- 📦 **Arsip & Unarchive:** Mengelola penyimpanan catatan dengan fitur pengarsipan.
- ⏳ **Loading Indicator:** Pengalaman pengguna yang halus dengan _Skeleton Screen_ dan _Spinner_.
- ⚠️ **Notifikasi Interaktif:** Feedback aksi pengguna menggunakan **SweetAlert2**.
- 📱 **Responsive UI:** Desain adaptif untuk berbagai ukuran layar (Mobile, Tablet, Desktop).

## 🛠️ Teknologi yang Digunakan

- **Bahasa Utama:** JavaScript (ES6+)
- **Arsitektur:** [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) (Custom Elements)
- **Module Bundler:** [Webpack](https://webpack.js.org/)
- **Data Fetching:** Fetch API
- **Styling:** CSS Grid & Flexbox
- **Library Eksternal:** [SweetAlert2](https://sweetalert2.github.io/) (Untuk alert & konfirmasi)

## 🌐 API Reference

Project ini terintegrasi dengan **Notes API** yang disediakan oleh Dicoding:
[https://notes-api.dicoding.dev/v2](https://notes-api.dicoding.dev/v2)

## 📁 Struktur Folder

`text`
src/
├── api/ # Modul untuk menangani request ke RESTful API
├── components/ # Custom Elements (app-bar, note-form, note-item, note-list)
├── styles.css # Berkas CSS (Global & Component styles)
└── main.js # Entry point aplikasi

## 📦 Instalasi & Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan project di lingkungan lokal:

1. **Clone repository**
   ```bash
   git clone [https://github.com/azyd-byte/notes-app.git](https://github.com/azyd-byte/notes-app.git)
   cd notes-app
   ```
