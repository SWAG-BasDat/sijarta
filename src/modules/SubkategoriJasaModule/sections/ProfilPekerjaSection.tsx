import React from "react";
import { WorkerProfile } from "../constant";

const WorkerProfilePage: React.FC = () => {
  // Gunakan data dari WorkerProfile
  const workerData = WorkerProfile;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-4">Profil Pekerja</h1>
        <div className="flex flex-col items-center">
          {/* Ikon Profil */}
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.48 13.92a7 7 0 10-4.96 0M12 14v6m-6-6h12"
              />
            </svg>
          </div>

          {/* Informasi Pekerja */}
          <div className="text-left w-full">
            <p className="text-gray-700 mb-2">
              <strong>Nama:</strong> {workerData.name}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Rating:</strong> {workerData.rating}/10
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Jumlah Pesanan Selesai:</strong> {workerData.completedOrders}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>No HP:</strong> {workerData.phoneNumber}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Tanggal Lahir:</strong> {workerData.birthDate}
            </p>
            <p className="text-gray-700">
              <strong>Alamat:</strong> {workerData.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfilePage;
