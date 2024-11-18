"use client"

import React, { useState } from "react";
import { PemesananJasaProps } from "../interface";
import TestimoniModal from "@/modules/TestimoniModule/components/TestimoniModal";

export const PemesananJasaSection: React.FC<PemesananJasaProps> = ({ orders }) => {
  // State to control the modal visibility and store the selected order
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  // Function to open the modal
  const handleWriteTestimonial = (orderId: number) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">View Pemesanan Jasa</h1>

      {/* Filter Options */}
      <div className="flex justify-between mb-4">
        <select className="border border-gray-300 rounded-lg py-2 px-4 w-1/3">
          <option value="">Subkategori</option>
          {/* Add subcategories dynamically */}
        </select>

        <select className="border border-gray-300 rounded-lg py-2 px-4 w-1/3">
          <option value="">Status Pesanan</option>
          {/* Add status dynamically */}
        </select>

        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-lg py-2 px-4 w-1/3"
        />
      </div>

      {/* Order List */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Subkategori Jasa</th>
            <th className="border border-gray-300 px-4 py-2">Sesi Layanan</th>
            <th className="border border-gray-300 px-4 py-2">Harga</th>
            <th className="border border-gray-300 px-4 py-2">Nama Pekerja</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{order.subkategori}</td>
              <td className="border border-gray-300 px-4 py-2">{order.sesiLayanan}</td>
              <td className="border border-gray-300 px-4 py-2">Rp {order.harga}</td>
              <td className="border border-gray-300 px-4 py-2">{order.namaPekerja}</td>
              <td className="border border-gray-300 px-4 py-2">{order.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                {order.status === "Menunggu Pembayaran" ||
                order.status === "Mencari Pekerja Terdekat" ? (
                  <button
                    onClick={() => console.log("Cancel order with ID:", order.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                  >
                    Batalkan
                  </button>
                ) : order.status === "Pesanan Selesai" && !order.hasTestimonial ? (
                    <TestimoniModal />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Testimoni Modal
      {isModalOpen && selectedOrderId && (
        <TestimoniModal />
      )} */}
    </div>
  );
};
