export type KategoriMyPay = "TopUp MyPay" | "Pembayaran Jasa" | "Transfer MyPay" | "Withdrawal";
export type UserType = "Pengguna" | "Pekerja";


export interface TransaksiMyPayProps {
    userType: UserType; // 'Pengguna' or 'Pekerja'
    userName: string;
    userBalance: number;
  }
  
export interface Transaction {
    kategoriTransaksi: string;
    nominal: number;
    tanggal: string; 
  }
  