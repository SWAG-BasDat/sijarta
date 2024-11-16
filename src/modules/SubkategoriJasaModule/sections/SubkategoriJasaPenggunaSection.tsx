// section/UserPage.tsx
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

  const handleProfilPekerja = (workerName: string) => {
    router.push(`/profile/${workerName}`); // Redirect to the worker's profile page
  };

  const handleRedirect = (subcategory: string) => {
    router.push(`/subcategories/${subcategory}`); // Redirect to the subcategory page
  };

  return (
    <div>
      <h1>{data.subcategory}</h1>
      <h2>Kategori: {data.category}</h2>
      <p>{data.description}</p>

      <h3>Daftar Sesi Layanan</h3>
      <ul>
        {data.services.map((service, index) => (
          <li key={index}>
            {service.session} - Rp{service.price}
            <button
              onClick={() => handleOrderClick(service)}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Pesan
            </button>
          </li>
        ))}
      </ul>

      <h3>Daftar Pekerja</h3>
      <ul>
        {data.workers.map((worker, index) => (
          <li key={index} onClick={() => handleProfilPekerja(worker)} style={{ cursor: "pointer", color: "#007BFF" }}>
            {worker}
          </li>
        ))}
      </ul>

      <h3>Testimoni</h3>
      <ul>
        {data.testimonials.map((testimonial, index) => (
          <li key={index}>
            <strong>{testimonial.user}</strong>: {testimonial.text} (Rating:{" "}
            {testimonial.rating}/5)
          </li>
        ))}
      </ul>

      {/* Show modal only if selectedService is not null */}
      {showModal && selectedService && (
        <PemesananModal
          service={selectedService}
          onClose={handleCloseModal}
          onSubmit={handlePemesananSubmit}
        />
      )}
    </div>
  );
};
