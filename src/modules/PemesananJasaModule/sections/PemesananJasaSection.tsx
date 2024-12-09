"use client"

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PemesananJasaProps } from "../interface";
import TestimoniModal from "@/modules/TestimoniModule/components/TestimoniModal";

export const PemesananJasaSection: React.FC<PemesananJasaProps> = ({ orders }) => {
  const { data: session, status } = useSession();
  const [filterSubkategori, setFilterSubkategori] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderData, setOrderData] = useState<any[]>([]); // Initialize with an empty array

  // Get the logged-in user's ID if authenticated
  let id_pelanggan = "";
  if (status === "authenticated" && session?.user?.id) {
    id_pelanggan = session.user.id;
  }

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const pelangganId = id_pelanggan; // Replace with the actual ID of the customer
        const response = await fetch(`/api/pesanan/${pelangganId}`);
        const data = await response.json();
        setOrderData(data); // Set fetched data to the state
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    
    fetchOrders();
  }, []);

  // Filter the orders based on the selected filters
  const filteredOrders = orderData.filter((order) => {
    const matchesSubkategori =
      !filterSubkategori || order.subkategori === filterSubkategori;
    const matchesStatus = !filterStatus || order.status === filterStatus;
    const matchesSearchQuery =
      !searchQuery || order.subkategori.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSubkategori && matchesStatus && matchesSearchQuery;
  });

  const uniqueSubcategories = [
    ...new Set(orderData.map((order) => order.subkategori)),
  ];
  const uniqueStatuses = [...new Set(orderData.map((order) => order.status))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        {/* Title Section */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">Pemesanan Jasa</h1>
          <p className="text-lg text-gray-700">
            Kelola pesanan jasa Anda dan buat testimoni untuk layanan yang telah selesai.
          </p>
        </div>

        {/* Filter Options */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter Pesanan Jasa</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Subkategori Filter */}
            <div className="flex-1">
              <label htmlFor="subkategori" className="block text-sm font-medium text-gray-700">
                Subkategori
              </label>
              <select
                id="subkategori"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={filterSubkategori}
                onChange={(e) => setFilterSubkategori(e.target.value)}
              >
                <option value="">Semua Subkategori</option>
                {uniqueSubcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex-1">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">Semua Status</option>
                {uniqueStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Cari Pesanan
              </label>
              <input
                id="search"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Masukkan kata kunci"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Order List */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 bg-blue-900 text-white text-lg font-semibold">
            Daftar Pemesanan
          </div>
          <div className="p-6">
            <table className="table-auto w-full text-left border-collapse border border-gray-200">
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
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
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
                          className="bg-red-500 text-white py-1 px-4 w-full rounded-lg hover:bg-red-600 text-center"
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
          </div>
        </div>
      </div>
    </div>
  );
};
