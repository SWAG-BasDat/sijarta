import { DateTime } from "next-auth/providers/kakao";

export interface Pengguna {
    nama: string;
    password: string;
    jenisKelamin: string;
    noHP: string;
    tanggalLahir: DateTime;
    alamat: string;
}

export interface Pekerja {
    nama: string;
    password: string;
    jenisKelamin: string;
    noHP: string;
    tanggalLahir: DateTime;
    alamat: string;
    namaBank: string;
    noRekening: string;
    npwp: string;
    urlFoto: string;
}