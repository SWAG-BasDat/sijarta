import { User } from 'next-auth';

export interface SijartaUser extends User {
  id: string;
  password: string;
  nama: string;
  noHP: string;
  jenisKelamin: "P" | "L";
  tanggalLahir: Date;
  alamat: string;
  saldoMyPay: number;
  isActive: boolean;
  isPekerja: boolean;
  namaBank?: string;
  noRekening?: string;
  npwp?: string;
  urlFoto?: string;
  rating?: number;
  kategori?: Array<string>;
  jmlPesananSelesai?: number;
}

declare module 'next-auth' {
  interface Session {
    user?: SijartaUser & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: SijartaUser;
  }
}