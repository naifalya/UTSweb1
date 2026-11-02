// script.js
// Satu file JavaScript dipakai oleh semua halaman.

// 1. FUNGSI BANTU

function formatRupiah(angka) {
  return "Rp" + Number(angka).toLocaleString("id-ID");
}

function teksKeAngka(teks) {
  return Number(String(teks).replace(/\D/g, ""));
}

function tanggalIndonesia(iso) {
  const tgl = new Date(iso + "T00:00:00");
  return tgl.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function tampilPesan(elemen, teks, sukses) {
  elemen.textContent = teks;
  elemen.classList.remove("error");
  elemen.classList.remove("sukses");
  if (teks === "") {
    return;
  }
  if (sukses === true) {
    elemen.classList.add("sukses");
  } else {
    elemen.classList.add("error");
  }
}

// Data yang berubah (stok baru, pesanan baru) disimpan di localStorage
function simpanData(kunci, data) {
  localStorage.setItem(kunci, JSON.stringify(data));
}

function bacaData(kunci, nilaiAwal) {
  const teks = localStorage.getItem(kunci);
  if (teks === null) {
    return nilaiAwal;
  }
  return JSON.parse(teks);
}

const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urutanStatus = ["Diproses", "Dikirim", "Dalam Perjalanan", "Terkirim"];
const ongkir = { Reguler: 15000, Express: 30000 };

// 2. DATA (dari data.js + yang tersimpan di localStorage)
function ambilKatalog() {
  const tersimpan = bacaData("katalog", null);
  if (tersimpan !== null) {
    return tersimpan;
  }
  const hasil = [];
  for (let i = 0; i < dataKatalogBuku.length; i++) {
    const b = dataKatalogBuku[i];
    hasil.push({
      kode: b.kodeBarang,
      judul: b.namaBarang,
      kategori: b.jenisBarang,
      edisi: b.edisi,
      harga: teksKeAngka(b.harga),
      stok: b.stok,
      gambar: b.cover
    });
  }
  return hasil;
}

function ambilSemuaPesanan() {
  const daftar = [];
  for (const nomor in dataTracking) {
    const t = dataTracking[nomor];
    daftar.push({
      noDO: t.nomorDO,
      nama: t.nama,
      status: Math.max(0, urutanStatus.indexOf(t.status)),
      ekspedisi: t.ekspedisi,
      tanggalKirim: t.tanggalKirim,
      jenisPaket: t.paket,
      total: teksKeAngka(t.total),
      items: [],
      perjalanan: t.perjalanan
    });
  }
  const pesananBaru = bacaData("pesananBaru", []);
  for (let i = 0; i < pesananBaru.length; i++) {
    daftar.push(pesananBaru[i]);
  }
  return daftar;
}

function ambilSemuaPengguna() {
  const daftar = [];
  for (let i = 0; i < dataPengguna.length; i++) {
    daftar.push(dataPengguna[i]);
  }
  const penggunaBaru = bacaData("penggunaBaru", []);
  for (let i = 0; i < penggunaBaru.length; i++) {
    daftar.push(penggunaBaru[i]);
  }
  return daftar;
}

function cariPengguna(email) {
  const semua = ambilSemuaPengguna();
  for (let i = 0; i < semua.length; i++) {
    if (semua[i].email.toLowerCase() === email) {
      return semua[i];
    }
  }
  return null;
}

// 3. TOMBOL KELUAR 
const tombolKeluar = document.querySelector("#btnLogout");
if (tombolKeluar) {
  tombolKeluar.addEventListener("click", function () {
    location.href = "index.html";
  });
}


// 4. HALAMAN LOGIN
const formLogin = document.querySelector("#formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault(); // supaya halaman tidak reload
    const email = document.querySelector("#email").value.trim().toLowerCase();
    const password = document.querySelector("#password").value;
    const pesan = document.querySelector("#pesanLogin");

    if (email === "" || password === "") {
      tampilPesan(pesan, "Email dan password wajib diisi.", false);
      return;
    }

    const user = cariPengguna(email);
    if (user === null || user.password !== password) {
      alert("Email/password yang Anda masukkan salah");
      tampilPesan(pesan, "Login gagal. Cek lagi email dan passwordnya.", false);
      return;
    }

    location.href = "dashboard.html";
  });

  // ----- membuka & menutup modal -----
  const modalLupa = document.querySelector("#modalLupa");
  const modalDaftar = document.querySelector("#modalDaftar");

  document.querySelector("#btnLupa").addEventListener("click", function () {
    modalLupa.classList.remove("sembunyi");
  });
  document.querySelector("#btnDaftar").addEventListener("click", function () {
    modalDaftar.classList.remove("sembunyi");
  });
  document.querySelector("#tutupLupa").addEventListener("click", function () {
    modalLupa.classList.add("sembunyi");
  });
  document.querySelector("#tutupDaftar").addEventListener("click", function () {
    modalDaftar.classList.add("sembunyi");
  });

  // klik di luar tutup
  modalLupa.addEventListener("click", function (e) {
    if (e.target === modalLupa) {
      modalLupa.classList.add("sembunyi");
    }
  });
  modalDaftar.addEventListener("click", function (e) {
    if (e.target === modalDaftar) {
      modalDaftar.classList.add("sembunyi");
    }
  });

  // ----- form Lupa Password -----
  document.querySelector("#formLupa").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.querySelector("#emailLupa").value.trim().toLowerCase();
    const pesan = document.querySelector("#pesanLupa");

    if (polaEmail.test(email) === false) {
      tampilPesan(pesan, "Masukkan email yang valid.", false);
      return;
    }
    if (cariPengguna(email) === null) {
      tampilPesan(pesan, "Email ini belum terdaftar.", false);
      return;
    }
    tampilPesan(pesan, "Tautan reset dikirim ke " + email + " (simulasi).", true);
  });

  // ----- form Daftar -----
  document.querySelector("#formDaftar").addEventListener("submit", function (e) {
    e.preventDefault();
    const nama = document.querySelector("#namaDaftar").value.trim();
    const email = document.querySelector("#emailDaftar").value.trim().toLowerCase();
    const pass1 = document.querySelector("#passDaftar").value;
    const pass2 = document.querySelector("#passDaftar2").value;
    const pesan = document.querySelector("#pesanDaftar");

    if (nama.length < 3) {
      tampilPesan(pesan, "Nama minimal 3 karakter.", false);
      return;
    }
    if (polaEmail.test(email) === false) {
      tampilPesan(pesan, "Format email belum benar.", false);
      return;
    }
    if (cariPengguna(email) !== null) {
      tampilPesan(pesan, "Email ini sudah terdaftar.", false);
      return;
    }
    if (pass1.length < 6) {
      tampilPesan(pesan, "Password minimal 6 karakter.", false);
      return;
    }
    if (pass1 !== pass2) {
      tampilPesan(pesan, "Ulangi password tidak sama.", false);
      return;
    }

    const penggunaBaru = bacaData("penggunaBaru", []);
    penggunaBaru.push({ nama: nama, email: email, password: pass1, role: "User" });
    simpanData("penggunaBaru", penggunaBaru);
    tampilPesan(pesan, "Pendaftaran berhasil, silakan login.", true);
    document.querySelector("#formDaftar").reset();
  });
}

// 5. DASHBOARD: greeting sesuai jam + ringkasan angka
const judulSapaan = document.querySelector("#greeting");
if (judulSapaan) {
  const jam = new Date().getHours();
  let waktu = "malam";
  if (jam >= 4 && jam < 11) {
    waktu = "pagi";
  } else if (jam >= 11 && jam < 15) {
    waktu = "siang";
  } else if (jam >= 15 && jam < 18) {
    waktu = "sore";
  }
  judulSapaan.textContent = "Selamat " + waktu + "!";

  document.querySelector("#tanggal").textContent = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });

  const katalog = ambilKatalog();
  let jumlahStok = 0;
  for (let i = 0; i < katalog.length; i++) {
    jumlahStok = jumlahStok + katalog[i].stok;
  }
  document.querySelector("#angkaJudul").textContent = katalog.length;
  document.querySelector("#angkaStok").textContent = jumlahStok;
  document.querySelector("#angkaPesanan").textContent = ambilSemuaPesanan().length;
}

// 6. STOK / KATALOG
const isiStok = document.querySelector("#isiStok");

function buatBarisStok(buku) {
  const baris = document.createElement("tr");

  const kolomGambar = document.createElement("td");
  const gambar = document.createElement("img");
  gambar.src = buku.gambar;
  gambar.alt = "Sampul " + buku.judul;
  kolomGambar.appendChild(gambar);
  baris.appendChild(kolomGambar);

  const isiKolom = [buku.kode, buku.judul, buku.kategori, buku.edisi, formatRupiah(buku.harga), buku.stok];
  for (let i = 0; i < isiKolom.length; i++) {
    const td = document.createElement("td");
    td.textContent = isiKolom[i];
    if (i === 0) {
      td.classList.add("kode");
    }
    if (i === 5 && buku.stok < 10) {
      td.classList.add("stok-tipis"); 
    }
    baris.appendChild(td);
  }
  return baris;
}

function tampilStok() {
  const kataKunci = document.querySelector("#cariStok").value.trim().toLowerCase();
  const katalog = ambilKatalog();

  isiStok.textContent = ""; 
  let jumlahJudul = 0;
  let jumlahStok = 0;

  for (let i = 0; i < katalog.length; i++) {
    const b = katalog[i];
    const judulCocok = b.judul.toLowerCase().includes(kataKunci);
    const kodeCocok = b.kode.toLowerCase().includes(kataKunci);
    if (judulCocok || kodeCocok) {
      isiStok.appendChild(buatBarisStok(b));
      jumlahJudul = jumlahJudul + 1;
      jumlahStok = jumlahStok + b.stok;
    }
  }
  document.querySelector("#totalJudul").textContent = jumlahJudul;
  document.querySelector("#totalStok").textContent = jumlahStok;
}

if (isiStok) {
  tampilStok();
  document.querySelector("#cariStok").addEventListener("input", tampilStok);

  document.querySelector("#resetKatalog").addEventListener("click", function () {
    localStorage.removeItem("katalog");
    tampilStok();
    tampilPesan(document.querySelector("#pesanStok"), "Katalog dikembalikan ke data awal.", true);
  });

  document.querySelector("#formStok").addEventListener("submit", function (e) {
    e.preventDefault();
    const kode = document.querySelector("#kode").value.trim().toUpperCase();
    const judul = document.querySelector("#judul").value.trim();
    const kategori = document.querySelector("#kategori").value;
    const edisi = document.querySelector("#edisi").value;
    const harga = document.querySelector("#harga").value;
    const stok = document.querySelector("#stok").value;
    const pesan = document.querySelector("#pesanStok");
    const katalog = ambilKatalog();

    if (kode === "" || judul === "" || kategori === "") {
      tampilPesan(pesan, "Kode, nama barang, dan jenis wajib diisi.", false);
      return;
    }

    if (/^[A-Z]{4}[0-9]{4}$/.test(kode) === false) {
      tampilPesan(pesan, "Kode harus 4 huruf diikuti 4 angka, contoh ASIP4302.", false);
      return;
    }
    for (let i = 0; i < katalog.length; i++) {
      if (katalog[i].kode === kode) {
        tampilPesan(pesan, "Kode " + kode + " sudah dipakai buku lain.", false);
        return;
      }
    }
    if (edisi === "" || Number(edisi) < 1) {
      tampilPesan(pesan, "Edisi minimal 1.", false);
      return;
    }
    if (harga === "" || Number(harga) < 1) {
      tampilPesan(pesan, "Harga minimal 1.", false);
      return;
    }
    if (stok === "" || Number(stok) < 0) {
      tampilPesan(pesan, "Stok tidak boleh kosong atau minus.", false);
      return;
    }


    katalog.push({
      kode: kode,
      judul: judul,
      kategori: kategori,
      edisi: edisi,
      harga: Number(harga),
      stok: Number(stok),
      gambar: "img/buku0.png"
    });
    simpanData("katalog", katalog);
    tampilStok();
    tampilPesan(pesan, "\"" + judul + "\" sudah masuk ke tabel stok.", true);
    document.querySelector("#formStok").reset();
  });
}


// 7. PEMESANAN (checkout)
const isiKeranjang = document.querySelector("#isiKeranjang");
let keranjang = bacaData("keranjang", []); 

function cariBuku(kode) {
  const katalog = ambilKatalog();
  for (let i = 0; i < katalog.length; i++) {
    if (katalog[i].kode === kode) {
      return katalog[i];
    }
  }
  return null;
}

function hitungSubtotal() {
  let total = 0;
  for (let i = 0; i < keranjang.length; i++) {
    const buku = cariBuku(keranjang[i].kode);
    if (buku !== null) {
      total = total + buku.harga * keranjang[i].qty;
    }
  }
  return total;
}

function paketTerpilih() {
  return document.querySelector('input[name="paket"]:checked');
}


function isiDropdownBuku() {
  const dropdown = document.querySelector("#pilihBuku");
  dropdown.length = 1;
  const katalog = ambilKatalog();
  for (let i = 0; i < katalog.length; i++) {
    const opsi = document.createElement("option");
    opsi.value = katalog[i].kode;
    opsi.textContent = katalog[i].judul + " - " + formatRupiah(katalog[i].harga) + " (stok " + katalog[i].stok + ")";
    dropdown.appendChild(opsi);
  }
}

function buatTombolHapus(urutan) {
  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.className = "tombol tombol-kecil";
  tombol.textContent = "Hapus";
  tombol.addEventListener("click", function () {
    keranjang.splice(urutan, 1); // buang 1 data di posisi urutan
    simpanData("keranjang", keranjang);
    tampilKeranjang();
  });
  return tombol;
}

function buatInputJumlah(item, buku) {
  const input = document.createElement("input");
  input.type = "number";
  input.min = 1;
  input.max = buku.stok;
  input.value = item.qty;
  input.setAttribute("aria-label", "Jumlah " + buku.judul);
  input.addEventListener("change", function () {
    const qtyBaru = Number(input.value);
    const pesan = document.querySelector("#pesanKeranjang");
    if (qtyBaru < 1 || qtyBaru > buku.stok) {
      tampilPesan(pesan, "Jumlah harus antara 1 sampai " + buku.stok + ".", false);
      input.value = item.qty;
      return;
    }
    item.qty = qtyBaru;
    simpanData("keranjang", keranjang);
    tampilKeranjang();
    tampilPesan(pesan, "Jumlah pesanan diperbarui.", true);
  });
  return input;
}

function tampilKeranjang() {
  isiKeranjang.textContent = "";

  if (keranjang.length === 0) {
    const baris = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.textContent = "Belum ada pesanan. Pilih buku lalu klik Tambah.";
    baris.appendChild(td);
    isiKeranjang.appendChild(baris);
  }

  for (let i = 0; i < keranjang.length; i++) {
    const item = keranjang[i];
    const buku = cariBuku(item.kode);
    if (buku === null) {
      continue;
    }

    const baris = document.createElement("tr");

    const tdJudul = document.createElement("td");
    tdJudul.textContent = buku.judul;
    baris.appendChild(tdJudul);

    const tdHarga = document.createElement("td");
    tdHarga.textContent = formatRupiah(buku.harga);
    baris.appendChild(tdHarga);

    const tdJumlah = document.createElement("td");
    tdJumlah.appendChild(buatInputJumlah(item, buku));
    baris.appendChild(tdJumlah);

    const tdSubtotal = document.createElement("td");
    tdSubtotal.textContent = formatRupiah(buku.harga * item.qty);
    baris.appendChild(tdSubtotal);

    const tdAksi = document.createElement("td");
    tdAksi.appendChild(buatTombolHapus(i));
    baris.appendChild(tdAksi);

    isiKeranjang.appendChild(baris);
  }

  let biayaKirim = 0;
  if (keranjang.length > 0 && paketTerpilih() !== null) {
    biayaKirim = ongkir[paketTerpilih().value];
  }
  document.querySelector("#subtotal").textContent = formatRupiah(hitungSubtotal());
  document.querySelector("#biayaOngkir").textContent = formatRupiah(biayaKirim);
  document.querySelector("#grandTotal").textContent = formatRupiah(hitungSubtotal() + biayaKirim);
}

// nomor DO 
function buatNomorDO() {
  const semua = ambilSemuaPesanan();
  let nomor = String(new Date().getFullYear()) + String(Math.floor(1000 + Math.random() * 9000));
  let sudahAda = true;
  while (sudahAda) {
    sudahAda = false;
    for (let i = 0; i < semua.length; i++) {
      if (semua[i].noDO === nomor) {
        sudahAda = true;
      }
    }
    if (sudahAda) {
      nomor = String(new Date().getFullYear()) + String(Math.floor(1000 + Math.random() * 9000));
    }
  }
  return nomor;
}

if (isiKeranjang) {
  isiDropdownBuku();
  tampilKeranjang();

  document.querySelector("#tambahBuku").addEventListener("click", function () {
    const kode = document.querySelector("#pilihBuku").value;
    const qty = Number(document.querySelector("#jumlah").value);
    const pesan = document.querySelector("#pesanKeranjang");
    const buku = cariBuku(kode);

    if (buku === null) {
      tampilPesan(pesan, "Pilih bukunya dulu.", false);
      return;
    }
    if (qty < 1) {
      tampilPesan(pesan, "Jumlah minimal 1.", false);
      return;
    }

    let itemLama = null;
    for (let i = 0; i < keranjang.length; i++) {
      if (keranjang[i].kode === kode) {
        itemLama = keranjang[i];
      }
    }
    let jumlahBaru = qty;
    if (itemLama !== null) {
      jumlahBaru = itemLama.qty + qty;
    }
    if (jumlahBaru > buku.stok) {
      tampilPesan(pesan, "Stok \"" + buku.judul + "\" hanya " + buku.stok + ".", false);
      return;
    }

    if (itemLama !== null) {
      itemLama.qty = jumlahBaru;
    } else {
      keranjang.push({ kode: kode, qty: qty });
    }
    simpanData("keranjang", keranjang);
    tampilKeranjang();
    tampilPesan(pesan, "Buku masuk ke daftar pesanan.", true);
  });

  const semuaPaket = document.querySelectorAll('input[name="paket"]');
  semuaPaket.forEach(function (radio) {
    radio.addEventListener("change", tampilKeranjang);
  });

  const formCheckout = document.querySelector("#formCheckout");

  document.querySelector("#btnReset").addEventListener("click", function () {
    formCheckout.reset();
    tampilKeranjang();
    tampilPesan(document.querySelector("#pesanCheckout"), "", false);
  });

  formCheckout.addEventListener("submit", function (e) {
    e.preventDefault();
    const nama = document.querySelector("#nama").value.trim();
    const email = document.querySelector("#emailPemesan").value.trim();
    const telp = document.querySelector("#telp").value.trim();
    const alamat = document.querySelector("#alamat").value.trim();
    const ekspedisi = document.querySelector("#ekspedisi").value;
    const bayar = document.querySelector("#bayar").value;
    const paket = paketTerpilih();
    const pesan = document.querySelector("#pesanCheckout");

    // dicek satu-satu, berhenti di error yang pertama
    if (keranjang.length === 0) {
      tampilPesan(pesan, "Pesanan masih kosong, tambahkan minimal satu buku.", false);
      return;
    }
    if (nama.length < 3) {
      tampilPesan(pesan, "Nama pemesan minimal 3 karakter.", false);
      return;
    }
    if (polaEmail.test(email) === false) {
      tampilPesan(pesan, "Format email pemesan belum benar.", false);
      return;
    }
    if (/^08[0-9]{8,11}$/.test(telp) === false) {
      tampilPesan(pesan, "No. telepon harus diawali 08 dan 10-13 digit.", false);
      return;
    }
    if (alamat.length < 10) {
      tampilPesan(pesan, "Alamat minimal 10 karakter.", false);
      return;
    }
    if (ekspedisi === "") {
      tampilPesan(pesan, "Pilih ekspedisi dulu.", false);
      return;
    }
    if (paket === null) {
      tampilPesan(pesan, "Pilih jenis paket.", false);
      return;
    }
    if (bayar === "") {
      tampilPesan(pesan, "Pilih metode pembayaran.", false);
      return;
    }
    if (document.querySelector("#setuju").checked === false) {
      tampilPesan(pesan, "Centang dulu pernyataan bahwa data sudah benar.", false);
      return;
    }

    const total = hitungSubtotal() + ongkir[paket.value];
    const katalog = ambilKatalog();
    const daftarBuku = [];
    for (let i = 0; i < keranjang.length; i++) {
      for (let j = 0; j < katalog.length; j++) {
        if (katalog[j].kode === keranjang[i].kode) {
          katalog[j].stok = katalog[j].stok - keranjang[i].qty;
          daftarBuku.push({ judul: katalog[j].judul, qty: keranjang[i].qty });
        }
      }
    }

    const noDO = buatNomorDO();
    const pesananBaru = bacaData("pesananBaru", []);
    pesananBaru.push({
      noDO: noDO,
      nama: nama,
      status: 0,
      ekspedisi: ekspedisi,
      tanggalKirim: new Date().toISOString().slice(0, 10),
      jenisPaket: paket.value,
      total: total,
      bayar: bayar,
      items: daftarBuku,
      perjalanan: [{ waktu: new Date().toLocaleString("id-ID"), keterangan: "Pesanan diterima dan sedang diproses" }]
    });
    simpanData("pesananBaru", pesananBaru);
    simpanData("katalog", katalog);

    keranjang = [];
    simpanData("keranjang", keranjang);
    formCheckout.reset();
    isiDropdownBuku();
    tampilKeranjang();
    tampilPesan(pesan, "Pesanan berhasil dibuat. Nomor DO: " + noDO, true);
    alert("Pesanan berhasil!\nNomor Delivery Order kamu: " + noDO);
  });
}

// 8. TRACKING: cari nomor DO 
const formTracking = document.querySelector("#formTracking");
if (formTracking) {
  formTracking.addEventListener("submit", function (e) {
    e.preventDefault();
    const nomor = document.querySelector("#noDO").value.trim();
    const pesan = document.querySelector("#pesanTracking");
    const hasil = document.querySelector("#hasilTracking");

    hasil.classList.add("sembunyi"); // sembunyikan hasil sebelumnya

    if (nomor === "") {
      tampilPesan(pesan, "Nomor Delivery Order wajib diisi.", false);
      return;
    }

    const semua = ambilSemuaPesanan();
    let pesanan = null;
    for (let i = 0; i < semua.length; i++) {
      if (semua[i].noDO === nomor) {
        pesanan = semua[i];
      }
    }
    if (pesanan === null) {
      tampilPesan(pesan, "Nomor DO " + nomor + " tidak ditemukan.", false);
      return;
    }
    tampilPesan(pesan, "Pesanan ditemukan.", true);

    document.querySelector("#tNama").textContent = pesanan.nama;
    document.querySelector("#tNomor").textContent = pesanan.noDO;
    document.querySelector("#statusTeks").textContent = urutanStatus[pesanan.status];
    document.querySelector("#tEkspedisi").textContent = pesanan.ekspedisi;
    document.querySelector("#tTanggal").textContent = tanggalIndonesia(pesanan.tanggalKirim);
    document.querySelector("#tPaket").textContent = pesanan.jenisPaket;
    document.querySelector("#tTotal").textContent = formatRupiah(pesanan.total);

    const persen = ((pesanan.status + 1) / urutanStatus.length) * 100;
    document.querySelector("#bar").style.width = persen + "%";
    document.querySelector(".progres").setAttribute("aria-valuenow", persen);

    const daftarLangkah = document.querySelector("#langkah");
    daftarLangkah.textContent = "";
    for (let i = 0; i < urutanStatus.length; i++) {
      const li = document.createElement("li");
      li.textContent = urutanStatus[i];
      if (i <= pesanan.status) {
        li.classList.add("selesai");
      }
      daftarLangkah.appendChild(li);
    }

    const daftarJalan = document.querySelector("#perjalanan");
    daftarJalan.textContent = "";
    for (let i = 0; i < pesanan.perjalanan.length; i++) {
      const li = document.createElement("li");
      const waktu = document.createElement("time");
      waktu.textContent = pesanan.perjalanan[i].waktu;
      const keterangan = document.createElement("span");
      keterangan.textContent = pesanan.perjalanan[i].keterangan;
      li.appendChild(waktu);
      li.appendChild(keterangan);
      daftarJalan.appendChild(li);
    }

    hasil.classList.remove("sembunyi");
  });
}

// 9. RIWAYAT: laporan pemesanan + history transaksi

const isiRiwayat = document.querySelector("#isiRiwayat");

function tampilRiwayat() {
  const filter = document.querySelector("#filterStatus").value;
  const semua = ambilSemuaPesanan();
  isiRiwayat.textContent = "";

  for (let i = semua.length - 1; i >= 0; i--) {
    const p = semua[i];
    if (filter !== "semua" && String(p.status) !== filter) {
      continue;
    }

    let teksBuku = "-";
    if (p.items.length > 0) {
      teksBuku = "";
      for (let j = 0; j < p.items.length; j++) {
        teksBuku = teksBuku + p.items[j].judul + " x" + p.items[j].qty;
        if (j < p.items.length - 1) {
          teksBuku = teksBuku + ", ";
        }
      }
    }

    const baris = document.createElement("tr");
    const isiKolom = [p.noDO, tanggalIndonesia(p.tanggalKirim), p.nama, teksBuku, formatRupiah(p.total)];
    for (let k = 0; k < isiKolom.length; k++) {
      const td = document.createElement("td");
      td.textContent = isiKolom[k];
      if (k === 0) {
        td.classList.add("kode");
      }
      baris.appendChild(td);
    }

    const tdStatus = document.createElement("td");
    const lencana = document.createElement("span");
    lencana.className = "lencana status" + p.status;
    lencana.textContent = urutanStatus[p.status];
    tdStatus.appendChild(lencana);
    baris.appendChild(tdStatus);

    isiRiwayat.appendChild(baris);
  }

  // kalau tidak ada yang cocok dengan filter
  if (isiRiwayat.children.length === 0) {
    const baris = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 6;
    td.textContent = "Tidak ada transaksi dengan status ini.";
    baris.appendChild(td);
    isiRiwayat.appendChild(baris);
  }
}

if (isiRiwayat) {
  // laporan: jumlah pesanan, buku terjual, omzet
  const semua = ambilSemuaPesanan();
  let jumlahBuku = 0;
  let omzet = 0;
  for (let i = 0; i < semua.length; i++) {
    omzet = omzet + semua[i].total;
    for (let j = 0; j < semua[i].items.length; j++) {
      jumlahBuku = jumlahBuku + semua[i].items[j].qty;
    }
  }
  document.querySelector("#lapPesanan").textContent = semua.length;
  document.querySelector("#lapItem").textContent = jumlahBuku;
  document.querySelector("#lapOmzet").textContent = formatRupiah(omzet);

  // isi pilihan filter dari daftar status
  const dropdown = document.querySelector("#filterStatus");
  for (let i = 0; i < urutanStatus.length; i++) {
    const opsi = document.createElement("option");
    opsi.value = i;
    opsi.textContent = urutanStatus[i];
    dropdown.appendChild(opsi);
  }
  dropdown.addEventListener("change", tampilRiwayat);

  tampilRiwayat();
}
