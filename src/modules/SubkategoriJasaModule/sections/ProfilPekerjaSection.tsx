import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for useRouter
import { useParams } from "next/navigation"; // Correct import for useParams

interface WorkerData {
  id: string;
  name: string;
  rating: number;
  completedOrders: number;
  phoneNumber: string;
  birthDate: string;
  address: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const WorkerProfilePage = () => {
  const [workerData, setWorkerData] = useState<WorkerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  const router = useRouter();
  const { workerId } = useParams();

  useEffect(() => {
    setIsClient(true); 
  }, []);

  useEffect(() => {
    if (!workerId || !isClient) return;

    const fetchWorkerData = async () => {
      try {
        const response = await fetch(`${API_URL}/workers/${workerId}`);
        if (!response.ok) throw new Error("Failed to fetch worker data");
        const data = await response.json();
        setWorkerData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch worker data");
        setLoading(false);
      }
    };

    fetchWorkerData();
  }, [workerId, isClient]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-4">Profil Pekerja</h1>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-6">
            {/* Icon or placeholder */}
          </div>

          <div className="text-left w-full">
            <p className="text-gray-700 mb-2">
              <strong>Nama:</strong> {workerData?.name || 'Not Available'}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Rating:</strong> {workerData?.rating}/10
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Jumlah Pesanan Selesai:</strong> {workerData?.completedOrders}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>No HP:</strong> {workerData?.phoneNumber}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Tanggal Lahir:</strong> {workerData?.birthDate}
            </p>
            <p className="text-gray-700">
              <strong>Alamat:</strong> {workerData?.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfilePage;
