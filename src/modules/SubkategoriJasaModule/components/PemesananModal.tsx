import React, { useState } from "react";
import { PemesananModalProps } from "../interface";

export const PemesananModal = ({ service, onClose, onSubmit }: PemesananModalProps) => {
  const [userName, setUserName] = useState("");
  const [tanggalPemesanan, setTanggalPemesanan] = useState("");
  const [kodeDiskon, setKodeDiskon] = useState("");
  const [metodePembayaran, setMetodePembayaran] = useState("");

  const handleSubmit = () => {
    // Ensure you only pass the required arguments (serviceName and userName)
    onSubmit(service.session, userName);
    onClose();
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

        {/* Nama Anda */}
        <label className="block mb-2 text-gray-700 font-medium">Nama Anda:</label>
        <input
          type="text"
          placeholder="Nama Anda"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border border-gray-300 rounded-lg py-3 px-4 w-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-4"
        />

        {/* Tanggal Pemesanan */}
        <label className="block mb-2 text-gray-700 font-medium">
          Tanggal Pemesanan:
        </label>
        <input
          type="date"
          value={tanggalPemesanan}
          onChange={(e) => setTanggalPemesanan(e.target.value)}
          className="border border-gray-300 rounded-lg py-3 px-4 w-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-4"
        />

        {/* Kode Diskon */}
        <label className="block mb-2 text-gray-700 font-medium">Diskon:</label>
        <input
          type="text"
          placeholder="Kode Diskon"
          value={kodeDiskon}
          onChange={(e) => setKodeDiskon(e.target.value)}
          className="border border-gray-300 rounded-lg py-3 px-4 w-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-4"
        />

        {/* Total Pembayaran */}
        <p className="mb-4 text-gray-700 font-medium">
          Total Pembayaran: <span className="font-bold">Rp {service.price}</span>
        </p>

        {/* Metode Pembayaran */}
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
            className="bg-blue-900 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 transition-colors w-1/2 mr-2"
          >
            Konfirmasi
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:bg-gray-400 transition-colors w-1/2"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};