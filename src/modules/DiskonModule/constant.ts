import { Promo, Voucher } from "./interface";

export const VOUCHERS: Voucher[] = [
  {
    kode: "DISC10",
    potongan: "10%",
    minTransaksi: 100000,
    jumlahHariBerlaku: 30,
    kuotaPenggunaan: 100,
    harga: 50000,
  },
  {
    kode: "DISC20",
    potongan: "20%",
    minTransaksi: 200000,
    jumlahHariBerlaku: 15,
    kuotaPenggunaan: 50,
    harga: 75000,
  },
  {
    kode: "DISC30",
    potongan: "30%",
    minTransaksi: 300000,
    jumlahHariBerlaku: 7,
    kuotaPenggunaan: 25,
    harga: 100000,
  },
];

export const PROMOS: Promo[] = [
  {
    kode: "PROMO1",
    tanggalAkhirBerlaku: "2024-12-31",
  },
  {
    kode: "PROMO2",
    tanggalAkhirBerlaku: "2024-12-31",
  },
  {
    kode: "PROMO3",
    tanggalAkhirBerlaku: "2024-12-31",
  },
];
