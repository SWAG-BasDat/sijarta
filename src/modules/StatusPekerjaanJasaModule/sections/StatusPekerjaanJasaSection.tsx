"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PESANAN_DUMMY, STATUS_PESANAN } from "../constant";
import { Pesanan } from "../interface";

const StatusPekerjaanJasaSection = () => {
  const [searchName, setSearchName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [filteredPesanan, setFilteredPesanan] = useState<Pesanan[]>(PESANAN_DUMMY);

  const handleSearch = () => {
    const filtered = PESANAN_DUMMY.filter((pesanan) => {
      const matchesName = pesanan.namaSubkategoriPesanan
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesStatus = selectedStatus ? pesanan.status === selectedStatus : true;
      return matchesName && matchesStatus;
    });
    setFilteredPesanan(filtered);
  };

  const handleUpdateStatus = (pesananId: string) => {
    setFilteredPesanan((prevPesanan) =>
      prevPesanan.map((pesanan) => {
        if (pesanan.id === pesananId) {
          if (pesanan.status === "Menunggu pekerja berangkat") {
            return { ...pesanan, status: "Pekerja tiba di lokasi" };
          } else if (pesanan.status === "Pekerja tiba di lokasi") {
            return { ...pesanan, status: "Pelayanan jasa sedang dilakukan" };
          } else if (pesanan.status === "Pelayanan jasa sedang dilakukan") {
            return { ...pesanan, status: "Pesanan selesai" };
          }
        }
        return pesanan;
      })
    );
  };

  return (
    <section className="py-8">
      <div className="container mx-auto">
        {/* Filter Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter Status Pesanan</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Input Nama Jasa */}
            <div className="flex-1">
              <label htmlFor="nama-jasa" className="block text-sm font-medium text-gray-700">
                Nama Jasa
              </label>
              <input
                id="nama-jasa"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Masukkan nama jasa"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>

            {/* Dropdown Status */}
            <div className="flex-1">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={selectedStatus || ""}
                onChange={(e) => setSelectedStatus(e.target.value || null)}
              >
                <option value="">Semua Status</option>
                {STATUS_PESANAN.map((status) => (
                  <option key={status.id} value={status.status}>
                    {status.status}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="bg-yellow-300 text-black px-4 py-2 rounded-md hover:bg-yellow-500"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* List Pesanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPesanan.map((pesanan) => (
            <Card key={pesanan.id} className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  {pesanan.namaSubkategoriPesanan}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Pesanan atas nama <strong>{pesanan.namaPelanggan}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Biaya:</strong> Rp {pesanan.totalBiaya.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Tanggal Pemesanan:</strong>{" "}
                  {new Date(pesanan.tanggalPemesanan).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Tanggal Pekerjaan:</strong>{" "}
                  {new Date(pesanan.tanggalPekerjaan).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong> {pesanan.status}
                </p>
                {pesanan.status !== "Pesanan selesai" &&
                  pesanan.status !== "Pesanan dibatalkan" && (
                    <button
                      onClick={() => handleUpdateStatus(pesanan.id)}
                      className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Update Status
                    </button>
                  )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatusPekerjaanJasaSection;
