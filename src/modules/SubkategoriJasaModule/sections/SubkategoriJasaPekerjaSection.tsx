"use client";

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        {/* Title Section */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">{data.subcategory}</h1>
          <p className="text-lg text-gray-700 mt-4">
            <strong>Kategori:</strong> {data.category}
          </p>
          <p className="text-gray-600 max-w-2xl">{data.description}</p>
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
              {data.services.map((service, index) => (
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
              {data.workers.map((worker) => (
                <li
                  key={worker.id}
                  className="text-gray-900"
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
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-white">Testimoni</h2>
            </div>
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
                      Rating: {testimonial.rating}/10
                    </span>
                    <div className="ml-2">
                      {/* Optional star rating icon */}
                      {[...Array(10)].map((_, i) => (
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

        {/* Button Bergabung */}
        {!joined && (
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
