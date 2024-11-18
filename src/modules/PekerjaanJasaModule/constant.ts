import { Subkategori } from "./interface";

export const KATEGORI_JASA = [
  { id: "1", namaKategori: "Home Cleaning" },
  { id: "2", namaKategori: "Deep Cleaning" },
  { id: "3", namaKategori: "Service AC" },
  { id: "4", namaKategori: "Massage" },
];

export const SUBKATEGORI_JASA: Record<string, Subkategori[]> = {
  "1": [
    { id: "1-1", namaSubkategori: "Daily Cleaning" },
    { id: "1-2", namaSubkategori: "Setrika" },
    { id: "1-3", namaSubkategori: "Pembersihan Dapur" },
  ],
  "2": [
    { id: "2-1", namaSubkategori: "Cuci Kasur" },
    { id: "2-2", namaSubkategori: "Cuci Sofa" },
    { id: "2-3", namaSubkategori: "Cuci Karpet" },
  ],
};

export const PESANAN_DUMMY = [
  {
    id: "1",
    subkategoriPesanan: "Daily Cleaning",
    namaPelanggan: "Budi Santoso",
    totalBiaya: 150000,
    tanggalPemesanan: "2024-11-01",
    tanggalPekerjaan: "2024-11-02",
    kategoriId: "1",
    subkategoriId: "1-1",
    statusKerjakan: "Mencari pekerja terdekat",
  },
  {
    id: "2",
    subkategoriPesanan: "Setrika",
    namaPelanggan: "Dewi Lestari",
    totalBiaya: 100000,
    tanggalPemesanan: "2024-11-03",
    tanggalPekerjaan: "2024-11-04",
    kategoriId: "1",
    subkategoriId: "1-2",
    statusKerjakan: "Mencari pekerja terdekat",
  },
  {
    id: "3",
    subkategoriPesanan: "Cuci Kasur",
    namaPelanggan: "Agus Pratama",
    totalBiaya: 200000,
    tanggalPemesanan: "2024-11-05",
    tanggalPekerjaan: "2024-11-06",
    kategoriId: "2",
    subkategoriId: "2-1",
    statusKerjakan: "Mencari pekerja terdekat",
  },
];
