"use client";

import React, { useState, useEffect } from "react";
import { SubkategoriProps, Service, Worker } from "../interface";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { PemesananModal } from "../components/PemesananModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const PenggunaPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<SubkategoriProps | null>(null);
  const [servicesData, setServicesData] = useState<Service[]>([]); // Initialize as an empty array
  const [workersData, setWorkersData] = useState<Worker[]>([]); // Initialize workers state
  const router = useRouter();
  const { id_subkategori } = useParams(); // Extract the ID from the dynamic route

  useEffect(() => {
    const fetchData = async () => {
      if (!id_subkategori) {
        setError("Subkategori ID is missing.");
        return; // Skip fetching if no ID is provided
      }

      try {
        // Fetch subkategori data
        const subkategoriResponse = await fetch(`${API_URL}/subkategorijasa/${id_subkategori}`);
        if (!subkategoriResponse.ok) {
          throw new Error(`Failed to fetch subkategori data. Status: ${subkategoriResponse.status}`);
        }
        const subkategoriData = await subkategoriResponse.json();
        setFetchedData(subkategoriData.data); // Store only the 'data' part

        // Fetch services data
        const servicesResponse = await fetch(`${API_URL}/sesilayanan/${id_subkategori}`);
        if (!servicesResponse.ok) {
          throw new Error(`Failed to fetch services data. Status: ${servicesResponse.status}`);
        }
        const servicesData = await servicesResponse.json();

        // Access the `data` field from the response and check if it's an array
        if (Array.isArray(servicesData.data)) {
          setServicesData(servicesData.data); // Use the 'data' field directly
        } else {
          setError("Services data is not an array.");
        }
        
        // Fetch worker data using kategorijasaid from subkategoriData
        const kategorijasaid = subkategoriData.data.categoryid; // Access kategorijasaid from subkategoriData
        if (!kategorijasaid) {
          throw new Error("Kategorijasaid is missing from the subkategori data.");
        }

        const workersResponse = await fetch(`${API_URL}/subkategorijasa/workers/${kategorijasaid}`);
        if (!workersResponse.ok) {
          throw new Error(`Failed to fetch workers data. Status: ${workersResponse.status}`);
        }
        const workersData = await workersResponse.json();

        // Check if workers data is an array
        if (Array.isArray(workersData.data)) {
          setWorkersData(workersData.data); // Use the 'data' field for workers
        } else {
          setError("Workers data is not an array.");
        }
      } catch (err: any) {
        console.error("Fetch error:", err); // Log the error for debugging
        setError(`An error occurred while fetching data: ${err.message || err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id_subkategori]); // Re-fetch when ID changes

  const handleOrderClick = (service: Service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handlePemesananSubmit = (serviceName: string, userName: string) => {
    alert(`Pesanan untuk layanan: ${serviceName} atas nama ${userName} telah diterima.`);
  };

  const handleProfilPekerja = (workerId: string) => {
    // Pass both the worker ID and category ID to the worker profile page
    router.push(`/subkategorijasa/workers/${id_subkategori}/${workerId}`);
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  const displayData = fetchedData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">{displayData?.name}</h1>
          <p className="text-lg text-gray-700">
            <strong>Kategori:</strong> {displayData?.category}
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">{displayData?.description}</p>
        </div>

        {/* Daftar Sesi Layanan */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="p-6 bg-blue-900 rounded-t-lg">
            <h2 className="text-2xl font-semibold text-white">Daftar Sesi Layanan</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {servicesData?.map((service: Service, index: number) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <span className="font-semibold text-gray-900">
                    {service.session} - Rp {service.price}
                  </span>
                  <button
                    onClick={() => handleOrderClick(service)}
                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Pesan
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Daftar Pekerja */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="p-6 bg-blue-900 rounded-t-lg">
            <h2 className="text-2xl font-semibold text-white">Daftar Pekerja</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {workersData?.map((worker: Worker) => (
                <li
                  key={worker.id}
                  className="text-gray-900 cursor-pointer hover:text-blue-600"
                  onClick={() => handleProfilPekerja(String(worker.id))}
                >
                  {worker.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedService && (
        <PemesananModal
          service={selectedService}
          onClose={() => setShowModal(false)}
          onSubmit={handlePemesananSubmit}
        />
      )}
    </div>
  );
};
