import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SijartaUser } from '../../../../types/next-auth';

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
        noHP: {
          label: "Phone Number:",
          type: "text",
          placeholder: "Your phone number",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        const pengguna: SijartaUser = {
          id: "1",
          noHP: "081234567890",
          nama: "Test User",
          password: "test",
          jenisKelamin: "L",
          tanggalLahir: new Date(),
          alamat: "Test Address",
          isActive: true,
          isPekerja: false,
          saldoMyPay: 0,
        };

        const pekerja: SijartaUser = {
          id: "2",
          noHP: "081234567891",
          nama: "Test Worker",
          password: "test",
          jenisKelamin: "P",
          tanggalLahir: new Date(),
          alamat: "Test Address",
          isActive: true,
          isPekerja: true,
          namaBank: "Test Bank",
          noRekening: "1234567890",
          npwp: "1234567890",
          urlFoto: "https://github.com/widaputri.png",
          saldoMyPay: 0,
          jmlPesananSelesai: 0,
          rating: 0,
          kategori: ["Test Category", "Test Category 2", "Test Category 3"],
        };

        if (
          credentials?.noHP === pengguna.noHP &&
          credentials?.password === pengguna.password
        ) {
          return pengguna;
        } else if (
          credentials?.noHP === pekerja.noHP &&
          credentials?.password === pekerja.password
        ) {
          return pekerja;
        } else {
          return null;
        }
      },
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
