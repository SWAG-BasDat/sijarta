export interface Kategori {
    id: string;
    namaKategori: string;
  }
  
  export interface Subkategori {
    id: string;
    namaSubkategori: string;
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
  }
  