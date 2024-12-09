import React, { useState } from "react";
import { PemesananModalProps } from "../interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const PemesananModal = ({
  service,
  onClose,
  onSubmit,
}: PemesananModalProps) => {
  const [userName, setUserName] = useState("");
  const [tanggalPemesanan, setTanggalPemesanan] = useState("");
  const [kodeDiskon, setKodeDiskon] = useState("");
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError("");

      if (!userName || !tanggalPemesanan || !metodePembayaran) {
        setError("Mohon lengkapi semua field yang diperlukan");
        return;
      }

      const requestData = {
        tanggal_pemesanan: tanggalPemesanan,
        diskon_id: kodeDiskon || null,
        metode_bayar_id: metodePembayaran,
        pelanggan_id: userName,
        total_pembayaran: service.price,
        status_pesanan: "Menunggu Pembayaran",
      };

      const response = await fetch(`${API_URL}/pesanan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Terjadi kesalahan saat memproses pemesanan"
        );
      }

      const data = await response.json();
      onSubmit(service.session, userName);
      onClose();
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat memproses pemesanan"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
          Pesan Layanan
        </h2>
        <h3 className="text-xl font-semibold text-blue-900 mb-4 text-center">
          {service.session} - Rp {service.price}
        </h3>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <label className="block mb-2 text-gray-700 font-medium">
          Nama Anda:
        </label>
        <input
          type="text"
          placeholder="Nama Anda"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border border-gray-300 rounded-lg py-3 px-4 w-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-4"
        />

        <label className="block mb-2 text-gray-700 font-medium">
          Tanggal Pemesanan:
        </label>
        <input
          type="date"
          value={tanggalPemesanan}
          onChange={(e) => setTanggalPemesanan(e.target.value)}
          className="border border-gray-300 rounded-lg py-3 px-4 w-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-4"
        />

        <label className="block mb-2 text-gray-700 font-medium">Diskon:</label>
        <input
          type="text"
          placeholder="Kode Diskon"
          value={kodeDiskon}
          onChange={(e) => setKodeDiskon(e.target.value)}
          className="border border-gray-300 rounded-lg py-3 px-4 w-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-4"
        />

        <p className="mb-4 text-gray-700 font-medium">
          Total Pembayaran:{" "}
          <span className="font-bold">Rp {service.price}</span>
        </p>

        <label className="block mb-2 text-gray-700 font-medium">
          Metode Pembayaran:
        </label>
        <select
          value={metodePembayaran}
          onChange={(e) => setMetodePembayaran(e.target.value)}
          className="border border-gray-300 rounded-lg py-3 px-4 w-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-4"
        >
          <option value="" disabled>
            Pilih Metode
          </option>
          <option value="Transfer Bank">Transfer Bank</option>
          <option value="E-Wallet">E-Wallet</option>
          <option value="COD">COD</option>
        </select>

        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`bg-blue-900 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 transition-colors w-1/2 mr-2 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Memproses..." : "Konfirmasi"}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:bg-gray-400 transition-colors w-1/2"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
