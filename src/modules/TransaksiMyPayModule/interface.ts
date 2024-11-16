// TransaksiMyPayModule/interface.ts

export type MyPayCategory = "TopUp MyPay" | "Pembayaran Jasa" | "Transfer MyPay" | "Withdrawal";
export type UserType = "Pengguna" | "Pekerja";

export interface TransaksiMyPayProps {
  userType: UserType;
  userName: string;
  userBalance: number;
}
