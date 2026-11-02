# Pustaka Kita — Aplikasi Pemesanan Buku

Tugas UTS Pemrograman Web 1. Aplikasi web front-end (HTML, CSS, JavaScript) untuk pemesanan buku pada toko online, tanpa server dan tanpa database. Seluruh data berasal dari variabel JavaScript di `js/data.js`.


Nama: Naifah Alya Kamilah

NIM: 312510193

Kelas: I251B


Link Video YouTube | [ISI LINK YOUTUBE] |

## Daftar Isi

1. [Deskripsi Project](#1-deskripsi-project)
2. [Cara Menjalankan](#2-cara-menjalankan)
3. [Struktur Folder](#3-struktur-folder)
4. [Alur Pengerjaan](#4-alur-pengerjaan)
5. [Penjelasan Teknis](#5-penjelasan-teknis)
6. [Hasil dan Tangkapan Layar Setiap Proses](#6-hasil-dan-tangkapan-layar-setiap-proses)
7. [Pemenuhan Kriteria Penilaian](#7-pemenuhan-kriteria-penilaian)
8. [Fitur Kreativitas Tambahan](#8-fitur-kreativitas-tambahan)
9. [Catatan dan Keterbatasan](#9-catatan-dan-keterbatasan)



## 1. Deskripsi Project

**Pustaka Kita** adalah simulasi toko buku online. Pengguna masuk lewat halaman login, lalu dari dashboard dapat melihat stok buku, menambah stok baru, membuat pesanan, melacak pengiriman, dan melihat laporan serta riwayat transaksi.

**Tujuan:** Soal UTS meminta aplikasi yang berfokus pada sisi front-end. Karena itu project ini membuktikan tiga hal:
- HTML dipakai untuk menyusun struktur halaman yang semantik, valid, dan lengkap.
- CSS dipakai untuk mengatur tampilan dengan tiga cara penulisan (inline, internal, eksternal).
- JavaScript dipakai untuk memanipulasi DOM, memvalidasi form, mengelola data tabel, dan membuat interaksi UI seperti alert dan modal box.



| Halaman | File | Fungsi |
|---|---|---|
| Login | `index.html` | Masuk dengan email dan password. Ada modal Lupa Password dan Daftar. |
| Dashboard | `dashboard.html` | Greeting sesuai jam lokal, ringkasan angka, dan menu navigasi. |
| Stok/Katalog | `stok.html` | Tabel stok dari `dataKatalogBuku`, pencarian, dan tambah baris stok. |
| Pemesanan | `checkout.html` | Tambah, ubah, dan hapus pesanan, serta data pemesan dan pembayaran. |
| Tracking | `tracking.html` | Cari nomor Delivery Order lalu tampilkan status dan detail pengiriman. |
| Laporan dan History | `riwayat.html` | Laporan pemesanan dan tabel history transaksi dengan filter status. |

`riwayat.html` adalah halaman tambahan. Menu Laporan Pemesanan dan History Transaksi di dashboard digabung ke halaman ini karena keduanya memakai sumber data yang sama.

**Digunakan:** HTML5, CSS3 (flexbox, grid, media query), dan JavaScript tanpa framework atau library. Penyimpanan sementara memakai `localStorage` bawaan browser.

## 2. Cara Menjalankan

1. Unduh atau clone repository ini.
2. Buka `index.html` di browser (tidak perlu server).
3. Login memakai salah satu akun dari `data.js`:

| Email | Password | Role |
|---|---|---|
| rina@gmail.com | rina123 | User |
| agus@gmail.com | agus123 | User |
| siti@gmail.com | siti123 | Admin |

4. Nomor Delivery Order untuk uji Tracking: `20230012` dan `20230013`. Pesanan baru dari halaman Pemesanan juga mendapat nomor DO otomatis.

## 3. Struktur Folder

```
tugas-uts-web1/
|-- index.html        (halaman login)
|-- dashboard.html
|-- stok.html
|-- checkout.html
|-- tracking.html
|-- riwayat.html      (Laporan Pemesanan + History Transaksi)
|-- css/style.css
|-- js/
|   |-- data.js       (data dari dosen, tidak diubah)
|   |-- script.js     (logika DOM, event, validasi)
|-- assets/logo.png
|-- img/              (sampul buku)
|-- screenshots/      (tangkapan layar tampilan)
|-- screenshots-kode/ (tangkapan layar kode)
```

Data dan logika sengaja dipisah: `data.js` hanya berisi data, `script.js` hanya berisi logika. Jika data berganti, logika tidak perlu diubah.

## 4. Alur Pengerjaan

Pekerjaan dibagi menjadi tiga lapisan (struktur, tampilan, perilaku) dan dikerjakan berurutan dari lapisan paling dasar.

1. **Membaca soal dan menyusun daftar halaman.** Ada lima halaman wajib. Untuk tiap halaman dicatat apa yang harus tampil dan data apa yang dibutuhkan.
2. **Memetakan data.** Data dari dosen sudah mencukupi: `dataPengguna` untuk login, `dataKatalogBuku` untuk stok dan checkout, `dataTracking` untuk pelacakan.
3. **Menulis HTML semua halaman tanpa gaya.** Fokusnya pada elemen semantik, tabel, form, dan label, sehingga struktur sudah benar sebelum diberi tampilan.
4. **Membuat satu CSS bersama.** Tema dan warna ditentukan dulu, lalu dipakai ulang di semua halaman supaya konsisten.
5. **Menghidupkan dengan JavaScript.** Urutannya: fungsi bantu, pengambilan data, login, dashboard, stok, checkout, tracking, lalu riwayat.
6. **Menguji tiap halaman.** Setiap validasi dicoba dengan input kosong, input salah, dan input benar.

## 5. Penjelasan Teknis

### 5.1 Struktur HTML

Setiap halaman memakai `DOCTYPE`, `lang="id"`, `meta charset`, dan `meta viewport`. Elemen semantik yang dipakai:

- `header` dan `nav` untuk kepala halaman dan navigasi
- `main` untuk isi utama
- `section` dengan `aria-labelledby` untuk bagian bertopik
- `aside` untuk panel dekoratif di halaman login
- `footer` untuk bagian bawah
- `details` dan `summary` untuk akun contoh di halaman login
- `table` lengkap dengan `caption`, `thead`, `tbody`, `tfoot`, dan `th scope`
- `form` dengan `label` yang terhubung lewat `for` dan `id`, serta `fieldset` dan `legend` untuk pilihan jenis paket

Gambar punya atribut `alt`. Gambar dekoratif diberi `alt` kosong agar tidak mengganggu pembaca layar.

### 5.2 Desain CSS

Ketiga cara penulisan CSS dipakai:

| Cara | Lokasi | Alasan |
|---|---|---|
| Eksternal | `css/style.css`, dipanggil dengan `<link>` di semua halaman | Cara utama; satu perubahan cukup di satu tempat |
| Internal | Tag `<style>` di `dashboard.html` | Gaya yang hanya dipakai halaman dashboard |
| Inline | Atribut `style` di `index.html` dan `checkout.html` | Penyesuaian jarak kecil saja |

Tema yang dipilih adalah **toko buku kertas dan tinta**. Warna diambil dari logo: slate `#3c4b57`, emas `#efb739`, abu-biru `#9eacb1`, dengan latar krem. Judul memakai huruf berserif (Georgia), label kecil memakai monospace, dan tombol serta kartu memakai garis tebal dengan bayangan tegas. Tata letak memakai flexbox (navigasi, barisan tombol) dan grid (halaman login, checkout, form), box-sizing `border-box`, serta media query agar tampil baik di tablet dan ponsel.

### 5.3 JavaScript

`script.js` dibagi menjadi sembilan bagian: fungsi bantu, data, tombol keluar, login, dashboard, stok, pemesanan, tracking, dan riwayat. Karena satu file dipakai semua halaman, setiap bagian dibungkus pengecekan `if` sehingga hanya berjalan jika elemennya ada di halaman yang dibuka.

Teknik yang dipakai:

| Teknik | Dipakai untuk |
|---|---|
| `querySelector` | Memilih elemen |
| `addEventListener` | Menangani submit, klik, input, dan change |
| `createElement` dan `appendChild` | Membuat baris tabel, input jumlah, dan tombol hapus |
| `classList` | Menampilkan dan menyembunyikan modal serta hasil tracking |
| `textContent` | Mengisi teks; dipilih daripada `innerHTML` agar masukan pengguna tidak dieksekusi sebagai HTML |
| `preventDefault()` | Mencegah form memuat ulang halaman |
| Regular expression | Memvalidasi email, kode buku, dan nomor telepon |
| `localStorage` + JSON | Menyimpan stok dan pesanan baru agar tidak hilang saat pindah halaman |

### 5.4 Validasi form dan umpan balik

Semua form memakai `novalidate` dan validasi ditulis sendiri dengan JavaScript, supaya pesan error spesifik dan tampil seragam di dalam halaman. Pengecekan dilakukan berurutan dan berhenti pada error pertama. Umpan balik diberikan lewat tiga cara: pesan merah atau hijau di bawah form, `alert()` untuk login gagal dan pesanan berhasil, serta modal box untuk Lupa Password dan Daftar.

---

## 6. Hasil dan Tangkapan Layar Setiap Proses

Setiap proses menampilkan dua bukti: tangkapan layar tampilan aplikasi dan tangkapan layar kode yang membuatnya berjalan.

### 6.1 Halaman Login (`index.html`)

**Tampilan awal.** Form email dan password, tombol Login, Lupa Password, dan Daftar.

![Halaman login](screenshots/01-login.png)

**Kode: struktur HTML login.** Memakai `main`, `aside`, `section`, `form`, `label`, dan `details`.

![Kode HTML login](screenshots-kode/k01-login-html.png)

**Validasi input kosong.** Menekan Login tanpa mengisi apa pun menampilkan pesan error.

![Login kosong](screenshots/02-login-kosong.png)

**Login salah.** Muncul `alert("Email/password yang Anda masukkan salah")` sesuai soal, dan pesan merah tetap tampil di form setelah alert ditutup.

![Login salah](screenshots/03-login-salah.png)

**Kode: validasi login.** Mengecek input kosong, lalu mencocokkan email dan password dengan data pengguna.

![Kode validasi login](screenshots-kode/k02-login-validasi-js.png)

**Modal Lupa Password.** Dibuat dari `div` dengan `position: fixed` dan ditampilkan lewat `classList`. Bisa ditutup dengan tombol Tutup atau klik di luar kotak.

![Modal lupa password](screenshots/04-modal-lupa.png)

**Kode: membuka dan menutup modal.**

![Kode modal](screenshots-kode/k03-login-modal-js.png)

**Kode CSS modal.** `position: fixed` dan class `sembunyi` untuk menyembunyikan.

![CSS modal](screenshots-kode/k05-modal-css.png)

**Modal Daftar dengan validasi berlapis.** Nama minimal 3 karakter, format email diperiksa regular expression, email tidak boleh sudah terdaftar, password minimal 6 karakter, dan ulangi password harus sama.

![Modal daftar](screenshots/05-modal-daftar-validasi.png)

**Kode: validasi pendaftaran.** Akun yang berhasil didaftarkan disimpan sehingga bisa dipakai untuk login.

![Kode validasi daftar](screenshots-kode/k04-daftar-validasi-js.png)

### 6.2 Dashboard (`dashboard.html`)

Greeting ditentukan dari jam lokal. Ada ringkasan jumlah judul, total stok, dan jumlah pesanan, serta empat menu: Stok, Tracking, Laporan Pemesanan, dan History Transaksi.

![Dashboard](screenshots/06-dashboard.png)

**Kode: greeting berdasarkan waktu lokal.** `new Date().getHours()` menentukan pagi (04.00–10.59), siang (11.00–14.59), sore (15.00–17.59), dan malam di luar itu. Angka ringkasan dihitung dari data.

![Kode greeting](screenshots-kode/k07-dashboard-greeting-js.png)

**Kode: CSS internal.** Gaya yang hanya dipakai dashboard ditulis di tag `<style>` pada halaman ini.

![Kode CSS internal](screenshots-kode/k06-dashboard-css-internal.png)

### 6.3 Informasi Stok (`stok.html`)

Tabel dibuat dinamis dari `dataKatalogBuku`. Baris total dihitung otomatis dan stok di bawah 10 diberi warna merah.

![Tabel stok](screenshots/07-stok.png)

**Kode: tabel HTML.** Hanya kerangka tabel; isi `tbody` diisi oleh JavaScript.

![Kode HTML tabel stok](screenshots-kode/k08-stok-html-tabel.png)

**Kode: menampilkan stok dinamis.** `buatBarisStok` membuat satu baris dengan `createElement`, dan `tampilStok` mengosongkan tabel lalu mengisinya lewat perulangan sambil menerapkan filter pencarian.

![Kode tampil stok](screenshots-kode/k09-stok-tampil-js.png)

**Pencarian.** Mengetik "manajemen" langsung menyaring tabel dan menghitung ulang total.

![Pencarian stok](screenshots/08-stok-cari.png)

**Validasi tambah stok.** Kode harus berpola empat huruf diikuti empat angka dan tidak boleh duplikat; field wajib tidak boleh kosong.

![Validasi stok](screenshots/09-stok-validasi.png)

**Tambah baris baru lewat DOM.** Baris baru muncul di tabel tanpa memuat ulang halaman.

![Tambah stok berhasil](screenshots/10-stok-tambah.png)

**Kode: validasi dan penambahan stok.** Data valid ditambahkan ke array, disimpan ke `localStorage`, lalu tabel digambar ulang.

![Kode tambah stok](screenshots-kode/k10-stok-tambah-js.png)

### 6.4 Pemesanan (`checkout.html`)

**Kode: form data pemesan dan pembayaran.** Setiap input punya `label`, pilihan paket dikelompokkan dengan `fieldset` dan `legend`.

![Kode HTML form checkout](screenshots-kode/k11-checkout-html-form.png)

**Validasi form.** Menekan Buat pesanan dalam keadaan kosong menampilkan error satu per satu, dimulai dari pesanan kosong.

![Validasi checkout](screenshots/11-checkout-validasi.png)

**Kode: menambah buku ke pesanan.** Mengecek buku terpilih, jumlah minimal, dan batas stok. Jika buku sudah ada di pesanan, jumlahnya ditambah.

![Kode tambah pesanan](screenshots-kode/k12-checkout-tambah-js.png)

**Pesanan terisi.** Jumlah bisa diubah langsung, subtotal dan total ikut berubah, baris bisa dihapus, dan ongkos kirim mengikuti jenis paket (Reguler atau Express).

![Checkout terisi](screenshots/12-checkout-terisi.png)

**Kode: menggambar daftar pesanan dan menghitung total.** Tabel pesanan dibangun ulang setiap ada perubahan.

![Kode keranjang](screenshots-kode/k13-checkout-keranjang-js.png)

**Kode: validasi data pemesan.** Telepon harus diawali 08 dengan 10 sampai 13 digit, alamat minimal 10 karakter, dan pernyataan persetujuan harus dicentang.

![Kode validasi checkout](screenshots-kode/k14-checkout-validasi-js.png)

**Pesanan berhasil.** Muncul alert berisi nomor Delivery Order, stok buku berkurang, dan pesanan dicatat.

![Checkout berhasil](screenshots/13-checkout-berhasil.png)

**Kode: menyimpan pesanan.** Stok dikurangi, pesanan baru dicatat dengan nomor DO otomatis, lalu alert ditampilkan.

![Kode simpan pesanan](screenshots-kode/k15-checkout-simpan-js.png)

### 6.5 Tracking (`tracking.html`)

**Hasil pencarian.** Input nomor `20230013` menampilkan nama pemesan, status dengan progress bar, ekspedisi, tanggal kirim, jenis paket, total pembayaran, dan perjalanan paket.

![Tracking hasil](screenshots/14-tracking-hasil.png)

**Kode: pencarian nomor DO.** Hasil sebelumnya disembunyikan, input divalidasi, lalu data dicari dan ditampilkan.

![Kode tracking](screenshots-kode/k16-tracking-cari-js.png)

**Kode: progress bar dan perjalanan paket.** Ada empat tahap status sehingga tiap tahap bernilai 25 persen. Tahap yang sudah dilewati diberi class `selesai`, dan riwayat perjalanan dibuat dengan `createElement`.

![Kode progress bar](screenshots-kode/k17-tracking-progress-js.png)

**Nomor tidak ditemukan.** Muncul pesan error.

![Tracking error](screenshots/15-tracking-error.png)

### 6.6 Laporan dan Riwayat (`riwayat.html`)

Laporan jumlah pesanan, buku terjual, dan omzet, ditambah tabel history transaksi dengan filter status.

![Riwayat](screenshots/16-riwayat.png)

**Kode: tabel history dengan filter.** Pesanan terbaru ditampilkan paling atas, dan ada pesan khusus jika tidak ada data yang cocok dengan filter.

![Kode riwayat](screenshots-kode/k18-riwayat-js.png)

### 6.7 Modularitas data dan tata letak

**Kode: data dosen di `data.js`.** File ini tidak diubah.

![Kode data.js](screenshots-kode/k19-data-js.png)

**Kode: data dari `data.js` diubah ke bentuk yang siap dipakai.** Harga bertipe teks (misalnya "Rp 180.000") diubah menjadi angka agar bisa dihitung.

![Kode ambil katalog](screenshots-kode/k20-data-ke-logika-js.png)

**Kode: CSS grid dan flexbox.** Contoh tata letak dua kolom dan kolom form yang menyesuaikan lebar layar.

![Kode CSS grid](screenshots-kode/k21-css-grid-flex.png)

---

## 7. Pemenuhan Kriteria Penilaian

| Kriteria | Bukti di project |
|---|---|
| Struktur HTML semantik, valid, dan lengkap | Bagian 5.1; `header`, `nav`, `main`, `section`, `aside`, `footer`, tabel lengkap, form dengan `label` |
| Desain CSS | Bagian 5.2; tiga cara penulisan, tema kertas dan tinta, flexbox, grid, media query |
| JavaScript DOM | Bagian 5.3; tabel dibuat dinamis, tambah, ubah, dan hapus baris, pencarian, filter, progress bar |
| Validasi form dan alert | Bagian 5.4; validasi di login, daftar, tambah stok, checkout, dan tracking dengan pesan error |
| Modularitas file dan struktur file | Bagian 3; HTML, CSS, data, dan skrip terpisah mengikuti diagram folder soal |
| Kreativitas tambahan | Bagian 8 |
| Penjelasan alur berpikir | Bagian 4 dan video YouTube |

## 8. Fitur Kreativitas Tambahan

- Tema visual kertas dan tinta dengan warna dari logo
- Sapaan dengan tanggal lengkap dan ringkasan angka di dashboard
- Pencarian di halaman stok
- Filter status di riwayat
- Ongkos kirim otomatis menurut jenis paket
- Stok berkurang setelah pemesanan
- Nomor Delivery Order dibuat otomatis
- Progress bar dan garis waktu perjalanan paket
- Modal Daftar yang benar-benar menyimpan akun baru untuk login

## 9. Catatan dan Keterbatasan

- **localStorage.** Variabel JavaScript dibuat ulang setiap pindah halaman, sehingga stok dan pesanan baru akan hilang. Karena itu perubahan disimpan di `localStorage`. Data asli dosen tetap utuh, dan tombol "Kembalikan data awal" di halaman stok menghapus data tersimpan.
- **Validasi.** Validasi dibuat dengan JavaScript sehingga tidak berjalan jika JavaScript dimatikan. Pada aplikasi nyata validasi di server tetap wajib.
- **Login.** Login bersifat simulasi front-end: password di `data.js` berupa teks biasa dan tidak ada sesi. Pada aplikasi nyata autentikasi harus dilakukan di server.
- **Data tracking.** Data `20230013` dari dosen berstatus "Dikirim" padahal riwayat perjalanannya sudah "Selesai Antar". Data tidak diubah; progress bar mengikuti kolom status.
- **Laporan.** Jumlah buku terjual hanya menghitung pesanan baru, karena data tracking dari dosen tidak memuat daftar buku.
