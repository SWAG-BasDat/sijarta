import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SijartaUser } from '../../../../types/next-auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const saveLocalStorage = (key: string, value: Session) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
  }
};

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        no_hp: {
          label: "Phone Number:",
          type: "text",
          placeholder: "Your phone number",
        },
        pwd: {
          label: "Password:",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user_id = await res.json();

        // If no error and we have a user id, return a user object with just the id
        if (res.ok && user_id) {
          const response = await fetch(`${API_URL}/users/${user_id}`);
          const user = await response.json();
          return {
            id: user.id,
            noHP: user.no_hp,
            nama: user.nama,
            jenisKelamin: user.jenis_kelamin,
            tanggalLahir: user.tgl_lahir,
            alamat: user.alamat,
            isActive: user.isActive,
            isPekerja: user.is_pekerja,
            namaBank: user.namaBank,
            noRekening: user.noRekening,
            npwp: user.npwp,
            urlFoto: user.url_foto,
            saldoMyPay: user.saldo_mypay,
            jmlPesananSelesai: user.jumlah_pesanan_selesai,
            rating: user.rating,
          } as SijartaUser;
        }

        // Return null if user data could not be retrieved
        return null;
      }
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as SijartaUser;
        token.id = customUser.id;
        token.noHP = customUser.noHP;
        token.nama = customUser.nama;
        token.jenisKelamin = customUser.jenisKelamin;
        token.tanggalLahir = customUser.tanggalLahir;
        token.alamat = customUser.alamat;
        token.isActive = customUser.isActive;
        token.isPekerja = customUser.isPekerja;
        token.namaBank = customUser.namaBank;
        token.noRekening = customUser.noRekening;
        token.npwp = customUser.npwp;
        token.urlFoto = customUser.urlFoto;
        token.saldoMyPay = customUser.saldoMyPay;
        token.jmlPesananSelesai = customUser.jmlPesananSelesai;
        token.rating = customUser.rating;
        token.kategori = customUser.kategori;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id as string,
          noHP: token.noHP as string,
          nama: token.nama as string,
          jenisKelamin: token.jenisKelamin as "P" | "L",
          tanggalLahir: token.tanggalLahir as Date,
          alamat: token.alamat as string,
          isActive: token.isActive as boolean,
          isPekerja: token.isPekerja as boolean,
          namaBank: token.namaBank,
          noRekening: token.noRekening,
          npwp: token.npwp,
          urlFoto: token.urlFoto,
          saldoMyPay: token.saldoMyPay,
          jmlPesananSelesai: token.jmlPesananSelesai,
          rating: token.rating,
          kategori: token.kategori
        } as SijartaUser;
      }

      saveLocalStorage("auth-session", session);
      return session;
    },
  },

  events: {
    signOut: async () => {
      removeLocalStorage("auth-session");
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages : {
    signIn: '/login',
  }
};