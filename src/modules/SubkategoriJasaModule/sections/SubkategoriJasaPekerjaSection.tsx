"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { SubkategoriProps, Service, Worker } from "../interface"; // Assuming these types are defined
import { useParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const PekerjaPage = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<SubkategoriProps | null>(null);
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [workersData, setWorkersData] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [joined, setJoined] = useState<boolean>(false);
  const { id_subkategori } = useParams(); // Extract the ID from the dynamic route

  // Get the logged-in user's ID if authenticated
  let id_pekerja = "";
  if (status === "authenticated" && session?.user?.id) {
    id_pekerja = session.user.id;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch subkategori data
        const subkategoriResponse = await fetch(`${API_URL}/subkategorijasa/${id_subkategori}`);
        if (!subkategoriResponse.ok) {
          const errorData = await subkategoriResponse.json();
          throw new Error(errorData.message || "Failed to fetch subkategori data");
        }
        const subkategoriData = await subkategoriResponse.json();
        console.log(subkategoriData.data);
        setData(subkategoriData.data);
    
        // Fetch services for the subkategori
        const servicesResponse = await fetch(`${API_URL}/sesilayanan/${id_subkategori}`);
        if (!servicesResponse.ok) {
          const errorData = await servicesResponse.json();
          throw new Error(errorData.message || "Failed to fetch services data");
        }
        const servicesData = await servicesResponse.json();
        setServicesData(servicesData.data);
    
        // Fetch worker data using kategorijasaid from subkategoriData
        const kategorijasaid = subkategoriData.data.categoryid; // Access kategorijasaid from subkategoriData
        if (!kategorijasaid) {
          throw new Error("Kategorijasaid is missing from the subkategori data.");
        }
    
        // Fetch workers for the subkategori
        const workersResponse = await fetch(`${API_URL}/subkategorijasa/workers/${kategorijasaid}`);
        if (!workersResponse.ok) {
          const errorData = await workersResponse.json();
          throw new Error(errorData.message || "Failed to fetch workers data");
        }
    
        // Parse the response correctly by accessing the `data` key
        const workersResponseData = await workersResponse.json();
        console.log(workersResponseData);  // Debugging log to check the structure
    
        // Extract workers array from the response data
        setWorkersData(workersResponseData.data);
    
      } catch (err: any) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };    

    fetchData();
  }, [id_subkategori]);

  const handleJoinClick = async () => {
    try {
      // Construct the payload
      const payload = {
        id: id_pekerja, // Logged-in user's id
        kategori_jasa_id: data?.categoryid, // The category id from subkategori data
      };
  
      // Make the API call to the backend to add the worker to the category
      const response = await fetch(`${API_URL}/subkategorijasa/add_pekerja_to_kategori`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add worker to category");
      }
  
      const responseData = await response.json();
      alert(responseData.message); // Show success message
      setJoined(true); // Hide the join button after joining
  
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };  

  // Check if the logged-in user (id_pekerja) is already a worker in this category
  const isUserWorker = workersData.some((worker) => String(worker.id) === id_pekerja);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        {/* Title Section */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">{data?.name}</h1>
          <p className="text-lg text-gray-700 mt-4">
            <strong>Kategori:</strong> {data?.category}
          </p>
          <p className="text-gray-600 max-w-2xl">{data?.description}</p>
        </div>

        {/* Daftar Sesi Layanan */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="p-6 bg-blue-900 rounded-t-lg">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-white">Daftar Sesi Layanan</h2>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {servicesData.map((service, index) => (
                <li key={index} className="flex justify-between items-center text-gray-900">
                  <span>{service.session}</span>
                  <span className="font-semibold text-gray-900">Rp {service.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Daftar Pekerja */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="p-6 bg-blue-900 rounded-t-lg">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-white">Daftar Pekerja</h2>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {workersData.length > 0 ? (
                workersData.map((worker) => (
                  <li key={worker.id} className="text-gray-900">
                    {worker.name}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No workers available</li>
              )}
            </ul>
          </div>
        </div>

        {/* Button Bergabung - Only show if user is not already a worker */}
        {!joined && !isUserWorker && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleJoinClick}
              className="bg-yellow-400 text-gray-900 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-all"
            >
              Bergabung
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
