export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/transaksiMyPay",
    "/myPay",
    "/diskon",
    "/profile",
    "/subkategorijasa/*",
    "/statusPekerjaanJasa",
    "/pemesananJasa",
    "/pekerjaanJasa",
  ],
};
