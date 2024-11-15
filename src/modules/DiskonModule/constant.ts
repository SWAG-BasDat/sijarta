import { PromoProps, VoucherProps } from "./interface";

export const VOUCHERS: VoucherProps[] = [
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

export const PROMOS: PromoProps[] = [
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

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const calculateExpiryDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};
