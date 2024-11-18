"use client";

import React, { useState } from "react";
import { SubkategoriProps, Service } from "../interface";
import { useRouter } from "next/navigation";
import { PemesananModal } from "../components/PemesananModal";

interface Props {
  data: SubkategoriProps;
}

export const PenggunaPage = ({ data }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const router = useRouter(); // useRouter hook to manage navigation

  const handleOrderClick = (service: Service) => {
    setSelectedService(service);
    setShowModal(true); // Show the modal when "Pesan" is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  const handlePemesananSubmit = (serviceName: string, userName: string) => {
    alert(`Pesanan untuk layanan: ${serviceName} atas nama ${userName} telah diterima.`);
  };

  const handleProfilPekerja = (workerId: number) => {
    router.push(`/subkategoriJasa/profile`); // Redirect to the worker's profile page
  };  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">{data.subcategory}</h1>
          <p className="text-lg text-gray-700">
            <strong>Kategori:</strong> {data.category}
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">{data.description}</p>
        </div>

        {/* Daftar Sesi Layanan */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="p-6 bg-blue-900 rounded-t-lg">
            <h2 className="text-2xl font-semibold text-white">Daftar Sesi Layanan</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {data.services.map((service, index) => (
                <li key={index} className="flex justify-between items-center p-4 rounded-lg hover:bg-gray-100 transition-all">
                  <span className="font-semibold text-gray-900">{service.session} - Rp {service.price}</span>
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
              {data.workers.map((worker) => (
                <li
                    key={worker.id}
                    className="text-gray-900 cursor-pointer hover:text-blue-600"
                    onClick={() => handleProfilPekerja(worker.id)} // Navigate to worker's profile
                >
                    {worker.name}
                </li>              
              ))}
            </ul>
          </div>
        </div>

        {/* Daftar Testimoni */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="p-6 bg-blue-900 rounded-t-lg">
            <h2 className="text-2xl font-semibold text-white">Testimoni</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-6">
              {data.testimonials.map((testimonial, index) => (
                <li
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-gray-900 font-semibold text-xl">
                      {testimonial.user}
                    </div>
                    <div className="text-sm text-gray-500">{testimonial.date}</div>
                  </div>
                  <div className="text-gray-700 mb-2">
                    <strong className="font-semibold">Pekerja: </strong>
                    {testimonial.worker}
                  </div>
                  <div className="text-gray-600 mb-4">{testimonial.text}</div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 font-semibold">
                      Rating: {testimonial.rating}/5
                    </span>
                    <div className="ml-2">
                      {/* Optional star rating icon */}
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`${
                            i < testimonial.rating ? "text-yellow-500" : "text-gray-300"
                          } text-xl`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Show modal only if selectedService is not null */}
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
