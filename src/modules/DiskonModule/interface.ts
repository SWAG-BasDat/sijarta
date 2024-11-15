export interface VoucherProps {
  kode: string;
  potongan: string;
  minTransaksi: number;
  jumlahHariBerlaku: number;
  kuotaPenggunaan: number;
  harga: number;
}

export interface PromoProps {
  kode: string;
  tanggalAkhirBerlaku: string;
}

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucherCode: string;
  expiryDate: string;
  quota: number;
}

export interface FailureModalProps {
  isOpen: boolean;
  onClose: () => void;
}
