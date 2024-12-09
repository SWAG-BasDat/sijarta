"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pesanan } from "../interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const StatusPekerjaanJasaSection = () => {
  const [pesananList, setPesananList] = useState<Pesanan[]>([]);
  const [searchName, setSearchName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pekerjaId, setPekerjaId] = useState<string>("default-user-id");

  useEffect(() => {
    setPekerjaId(localStorage.getItem("userId") || "default-user-id");
  }, []);

  useEffect(() => {
    const fetchPesanan = async () => {
      if (!pekerjaId) return;

      try {
        setLoading(true);
        const url = new URL(`${API_URL}/api/status-pekerjaan/${pekerjaId}`);
        if (searchName) url.searchParams.append("nama_jasa", searchName);
        if (selectedStatus) url.searchParams.append("status", selectedStatus);

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error("Gagal mengambil data pekerjaan.");
        }
        const data = await response.json();
        setPesananList(data.status_pekerjaan || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPesanan();
  }, [searchName, selectedStatus, pekerjaId]);

  // Update status pekerjaan
  const handleUpdateStatus = async (pesananId: string, action: number) => {
    try {
      const response = await fetch(
        `${API_URL}/api/status-pemesanan/${pekerjaId}/${pesananId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ button_action: action }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal memperbarui status pekerjaan.");
      }

      const result = await response.json();
      alert(result.message);

      // Refresh data setelah update status
      const fetchPesanan = async () => {
        const url = new URL(`${API_URL}/api/status-pekerjaan/${pekerjaId}`);
        if (searchName) url.searchParams.append("nama_jasa", searchName);
        if (selectedStatus) url.searchParams.append("status", selectedStatus);

        const response = await fetch(url.toString());
        const data = await response.json();
        setPesananList(data.status_pekerjaan || []);
      };

      fetchPesanan();
    } catch (err: any) {
      alert("Error: " + err.message);
    }
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
              <label
                htmlFor="nama-jasa"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={selectedStatus || ""}
                onChange={(e) => setSelectedStatus(e.target.value || null)}
              >
                <option value="">Semua Status</option>
                <option value="Menunggu pekerja berangkat">
                  Menunggu Pekerja Berangkat
                </option>
                <option value="Pekerja tiba di lokasi">
                  Pekerja Tiba di Lokasi
                </option>
                <option value="Pelayanan jasa sedang dilakukan">
                  Pelayanan Jasa Sedang Dilakukan
                </option>
                <option value="Pesanan selesai">Pesanan Selesai</option>
              </select>
            </div>
          </div>
        </div>

        {/* List Pesanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {!loading && !error && pesananList.length === 0 && (
            <div>Data tidak ditemukan.</div>
          )}
          {pesananList.map((pesanan) => (
            <Card key={pesanan.pesanan_id} className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  {pesanan.nama_jasa}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Pesanan atas nama <strong>{pesanan.nama_pelanggan}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Biaya:</strong> Rp{" "}
                  {Number(pesanan.total_biaya).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong> {pesanan.status}
                </p>
                {pesanan.status === "Menunggu pekerja berangkat" && (
                  <button
                    onClick={() => handleUpdateStatus(pesanan.pesanan_id, 1)}
                    className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Tiba di Lokasi
                  </button>
                )}
                {pesanan.status === "Pekerja tiba di lokasi" && (
                  <button
                    onClick={() => handleUpdateStatus(pesanan.pesanan_id, 2)}
                    className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Melakukan Pelayanan Jasa
                  </button>
                )}
                {pesanan.status === "Pelayanan jasa sedang dilakukan" && (
                  <button
                    onClick={() => handleUpdateStatus(pesanan.pesanan_id, 3)}
                    className="mt-4 w-full bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Selesai Melakukan Pelayanan
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
