"use client";

// section/WorkerPage.tsx
import React, { useState } from "react";
import { SubkategoriProps } from "../interface";

interface Props {
  data: SubkategoriProps;
  isJoined: boolean; // Indicates whether the user has joined this category
}

export const PekerjaPage = ({ data, isJoined }: Props) => {
  const [joined, setJoined] = useState(isJoined);

  const handleJoinClick = () => {
    alert("Anda telah bergabung ke kategori ini!");
    setJoined(true); // Update the state to hide the button after joining
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
          </li>
        ))}
      </ul>

      <h3>Daftar Pekerja</h3>
      <ul>
        {data.workers.map((worker, index) => (
          <li key={index}>{worker}</li>
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

      {/* Button Bergabung */}
      {!joined && (
        <button
          onClick={handleJoinClick}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Bergabung
        </button>
      )}
    </div>
  );
};
