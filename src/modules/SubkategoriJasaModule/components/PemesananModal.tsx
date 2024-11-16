// PemesananModal.tsx

import React, { useState } from "react";
import { PemesananModalProps } from "../interface";

export const PemesananModal = ({ service, onClose, onSubmit }: PemesananModalProps) => {
  const [userName, setUserName] = useState("");

  const handleSubmit = () => {
    onSubmit(service.session, userName);  // Use service.session to pass the session name
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
        <input
          type="text"
          placeholder="Nama Anda"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border border-gray-300 rounded-lg py-3 px-4 w-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mb-4"
        />
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
