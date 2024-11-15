export interface Voucher {
  kode: string;
  potongan: string;
  minTransaksi: number;
  jumlahHariBerlaku: number;
  kuotaPenggunaan: number;
  harga: number;
}

export interface Promo {
  kode: string;
  tanggalAkhirBerlaku: string;
}
