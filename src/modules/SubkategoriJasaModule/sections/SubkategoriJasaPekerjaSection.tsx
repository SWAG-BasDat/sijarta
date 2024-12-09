"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import TestimoniSection from "@/modules/TestimoniModule/sections/TestimoniSection";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface SubkategoriProps {
  id: string;
  name: string;
  category: string;
  description: string;
  categoryid: string;
}

interface Service {
  session: string;
  price: number;
}

interface Worker {
  id: string;
  name: string;
  rating: number;
  jumlah_pesanan_selesai: number;
}

export const PekerjaPage = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<SubkategoriProps | null>(null);
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [workersData, setWorkersData] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [joined, setJoined] = useState<boolean>(false);
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  const { id_subkategori } = useParams();

  let id_pekerja = "";
  if (status === "authenticated" && session?.user?.id) {
    id_pekerja = session.user.id;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const subkategoriResponse = await fetch(
          `${API_URL}/subkategorijasa/${id_subkategori}`
        );
        if (!subkategoriResponse.ok) {
          const errorData = await subkategoriResponse.json();
          throw new Error(
            errorData.message || "Failed to fetch subkategori data"
          );
        }
        const subkategoriData = await subkategoriResponse.json();
        setData(subkategoriData.data);

        const servicesResponse = await fetch(
          `${API_URL}/sesilayanan/${id_subkategori}`
        );
        if (!servicesResponse.ok) {
          const errorData = await servicesResponse.json();
          throw new Error(errorData.message || "Failed to fetch services data");
        }
        const servicesData = await servicesResponse.json();
        setServicesData(servicesData.data);

        // Get kategori ID and fetch workers
        const kategorijasaid = subkategoriData.data.categoryid;
        if (!kategorijasaid) {
          throw new Error(
            "Kategorijasaid is missing from the subkategori data."
          );
        }

        const workersResponse = await fetch(
          `${API_URL}/subkategorijasa/workers/${kategorijasaid}`
        );
        if (!workersResponse.ok) {
          const errorData = await workersResponse.json();
          throw new Error(errorData.message || "Failed to fetch workers data");
        }
        const workersResponseData = await workersResponse.json();
        setWorkersData(workersResponseData.data);
      } catch (err: any) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id_subkategori]);

  const showNotification = (message: string, type: "success" | "error") => {
    const notification = document.createElement("div");
    notification.className = `
      fixed top-4 right-4 px-6 py-3 rounded shadow-lg transition-opacity duration-500
      ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 3000);
  };

  const handleJoinClick = async () => {
    setIsJoining(true);
    setJoinError(null);

    try {
      const payload = {
        id: id_pekerja,
        kategori_jasa_id: data?.categoryid,
      };

      const response = await fetch(
        `${API_URL}/subkategorijasa/add_pekerja_to_kategori`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to join category");
      }

      // Update workers list
      setWorkersData((prevWorkers) => [
        ...prevWorkers,
        {
          id: id_pekerja,
          name: session?.user?.name || "New Worker",
          rating: 0,
          jumlah_pesanan_selesai: 0,
        },
      ]);

      setJoined(true);
      showNotification(
        responseData.message || "Successfully joined category!",
        "success"
      );
    } catch (err: any) {
      setJoinError(err.message);
      showNotification(err.message, "error");
    } finally {
      setIsJoining(false);
    }
  };

  // Check if user is already a worker
  const isUserWorker = workersData.some(
    (worker) => String(worker.id) === id_pekerja
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        {/* Title Section */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">
            {data?.name}
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            <strong>Kategori:</strong> {data?.category}
          </p>
          <p className="text-gray-600 max-w-2xl">{data?.description}</p>
        </div>

        {/* Daftar Sesi Layanan */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="p-6 bg-blue-900 rounded-t-lg">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-white">
                Daftar Sesi Layanan
              </h2>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {servicesData.map((service, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-gray-900"
                >
                  <span>{service.session}</span>
                  <span className="font-semibold text-gray-900">
                    Rp {service.price.toLocaleString("id-ID")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Daftar Pekerja */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="p-6 bg-blue-900 rounded-t-lg">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-white">
                Daftar Pekerja
              </h2>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {workersData.length > 0 ? (
                workersData.map((worker) => (
                  <li
                    key={worker.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-gray-900">{worker.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        Rating: {worker.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-600">
                        Pesanan: {worker.jumlah_pesanan_selesai}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-center py-4">
                  Belum ada pekerja terdaftar
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mx-10">
          <TestimoniSection
            id_subkategori={
              Array.isArray(id_subkategori) ? id_subkategori[0] : id_subkategori
            }
          />
        </div>

        {/* Button Bergabung */}
        {!joined && !isUserWorker && (
          <div className="flex flex-col items-center mt-8">
            <button
              onClick={handleJoinClick}
              disabled={isJoining}
              className={`
                bg-yellow-400 text-gray-900 font-semibold py-3 px-8 
                rounded-lg shadow-md hover:bg-yellow-500 
                focus:outline-none focus:ring-2 focus:ring-yellow-600 
                transition-all flex items-center gap-2
                ${isJoining ? "opacity-75 cursor-not-allowed" : ""}
              `}
            >
              {isJoining ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sedang Bergabung...
                </>
              ) : (
                "Bergabung"
              )}
            </button>
            {joinError && (
              <p className="text-red-500 mt-2 text-sm">{joinError}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PekerjaPage;
