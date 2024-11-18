export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/transaksiMyPay",
    "/myPay",
    "/diskon",
    "/profile",
    "/subkategorijasa/",
    "/subkategorijasa/profile",
    "/subkategorijasa/testimoni",
    "/statusPekerjaanJasa",
    "/pemesananJasa",
    "/pekerjaanJasa",
  ],
};
