export interface Kategori {
  id: string;
  nama: string;
}

export interface Subkategori {
  id: string;
  nama: string;
}

export interface Pesanan {
  id: string;
  subkategoriPesanan: string;
  namaPelanggan: string;
  totalBiaya: number;
  tanggalPemesanan: string;
  tanggalPekerjaan: string;
  kategoriId: string;
  subkategoriId: string;
  statusKerjakan: string;
  sesi: number;
}
