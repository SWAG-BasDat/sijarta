import { User } from 'next-auth';

export interface SijartaUser extends User {
  id: string;
  password: string;
  nama: string;
  noHP: string;
  jenisKelamin: "P" | "L";
  tanggalLahir: Date;
  alamat: string;
  isActive: boolean;
  isPekerja: boolean;
  namaBank?: string;
  noRekening?: string;
  npwp?: string;
  urlFoto?: string;
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