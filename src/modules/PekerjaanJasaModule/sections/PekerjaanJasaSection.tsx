"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { KATEGORI_JASA, SUBKATEGORI_JASA, PESANAN_DUMMY } from "../constant";
import { Kategori, Subkategori, Pesanan } from "../interface";

export const PekerjaanJasaSection = () => {
  const [selectedKategori, setSelectedKategori] = useState<string | null>(null);
  const [selectedSubkategori, setSelectedSubkategori] = useState<string | null>(
    null
  );
  const [filteredPesanan, setFilteredPesanan] = useState<Pesanan[]>(PESANAN_DUMMY);

  const handleUpdateStatus = (pesananId: string) => {
    setFilteredPesanan((prevPesanan) =>
      prevPesanan.map((pesanan) => {
        if (pesanan.id === pesananId && pesanan.statusKerjakan === "Mencari pekerja terdekat") {
          return { ...pesanan, statusKerjakan: "Menunggu pekerja terdekat" };
        }
        return pesanan;
      })
    );
  };
  
  const handleSearch = () => {
    const filtered = PESANAN_DUMMY.filter((pesanan) => {
      const matchKategori =
        !selectedKategori || pesanan.kategoriId === selectedKategori;
      const matchSubkategori =
        !selectedSubkategori || pesanan.subkategoriId === selectedSubkategori;
      return matchKategori && matchSubkategori;
    });
    setFilteredPesanan(filtered);
  };


  return (
    <section className="py-8">
      <div className="container mx-auto">
        {/* Filter Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter Pesanan</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Dropdown Kategori */}
            <div className="flex-1">
              <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select
                id="kategori"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={selectedKategori || ""}
                onChange={(e) => {
                  setSelectedKategori(e.target.value || null);
                  setSelectedSubkategori(null);
                }}
              >
                <option value="">Pilih Kategori</option>
                {KATEGORI_JASA.map((kategori: Kategori) => (
                  <option key={kategori.id} value={kategori.id}>
                    {kategori.namaKategori}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown Subkategori */}
            <div className="flex-1">
              <label htmlFor="subkategori" className="block text-sm font-medium text-gray-700">
                Subkategori
              </label>
              <select
                id="subkategori"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={selectedSubkategori || ""}
                onChange={(e) => setSelectedSubkategori(e.target.value || null)}
                disabled={!selectedKategori}
              >
                <option value="">Pilih Subkategori</option>
                {selectedKategori &&
                  SUBKATEGORI_JASA[selectedKategori as keyof typeof SUBKATEGORI_JASA]?.map(
                    (subkategori: Subkategori) => (
                      <option key={subkategori.id} value={subkategori.id}>
                        {subkategori.namaSubkategori}
                      </option>
                    )
                  )}
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
                  {pesanan.subkategoriPesanan}
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
                    <strong>Status Kerjakan:</strong> {pesanan.statusKerjakan}
                </p>
                <button
                onClick={() => handleUpdateStatus(pesanan.id)}
                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                Kerjakan Pesanan
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PekerjaanJasaSection;
