"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Kategori, Subkategori, Pesanan } from "../interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const PekerjaanJasaSection = () => {
  const [kategoriJasa, setKategoriJasa] = useState<Kategori[]>([]);
  const [subkategoriJasa, setSubkategoriJasa] = useState<Subkategori[]>([]);
  const [pesananTersedia, setPesananTersedia] = useState<Pesanan[]>([]);
  const [selectedKategori, setSelectedKategori] = useState<string | null>(null);
  const [selectedSubkategori, setSelectedSubkategori] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pekerjaId = "5e1163d9-df66-4ef8-9a7d-d387e5083a68"; // Replace with dynamic worker ID if needed

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/pekerjaan-jasa/${pekerjaId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pekerjaan jasa data");
        }
        const data = await response.json();

        // Set kategori, subkategori, and pesanan data
        setKategoriJasa(data.kategori_jasa || []);
        setSubkategoriJasa([]);
        setPesananTersedia(
          data.pesanan_tersedia.map((pesanan: any) => ({
            id: pesanan.pesanan_id,
            subkategoriPesanan: pesanan.nama_subkategori,
            namaPelanggan: pesanan.nama_pelanggan,
            totalBiaya: Number(pesanan.total_biaya),
            tanggalPemesanan: pesanan.tanggal_pemesanan,
            sesi: pesanan.sesi,
          }))
        );

        // Automatically set the first category as selected, if available
        if (data.kategori_jasa?.length > 0) {
          setSelectedKategori(data.kategori_jasa[0].id);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pekerjaId]);

  // Fetch subcategories when the selected category changes
  useEffect(() => {
    if (!selectedKategori) return;

    const fetchSubcategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_URL}/api/pekerjaan-jasa/${pekerjaId}?kategori_id=${selectedKategori}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subkategori jasa");
        }
        const data = await response.json();
        setSubkategoriJasa(data.subkategori_jasa || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [selectedKategori, pekerjaId]);

  // Update status pesanan when "Kerjakan Pesanan" is clicked
  const handleKerjakanPesanan = async (pesananId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/pekerjaan-jasa/${pekerjaId}/pesanan/${pesananId}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update pesanan status");
      }
      const result = await response.json();
      alert(result.message);

      // Refresh pesanan data
      const updatedResponse = await fetch(`${API_URL}/api/pekerjaan-jasa/${pekerjaId}`);
      const updatedData = await updatedResponse.json();
      setPesananTersedia(
        updatedData.pesanan_tersedia.map((pesanan: any) => ({
          id: pesanan.pesanan_id,
          subkategoriPesanan: pesanan.nama_subkategori,
          namaPelanggan: pesanan.nama_pelanggan,
          totalBiaya: Number(pesanan.total_biaya),
          tanggalPemesanan: pesanan.tanggal_pemesanan,
          sesi: pesanan.sesi,
        }))
      );
    } catch (err: any) {
      alert("Gagal memperbarui pesanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-8">
      <div className="container mx-auto">
        {/* Filter Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter Pesanan</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Dropdown Kategori */}
            <div className="flex-1">
              <label
                htmlFor="kategori"
                className="block text-sm font-medium text-gray-700"
              >
                Kategori
              </label>
              <select
                id="kategori"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={selectedKategori || ""}
                onChange={(e) => {
                  setSelectedKategori(e.target.value || null);
                  setSelectedSubkategori(null); // Reset subkategori when kategori changes
                }}
              >
                <option value="">Pilih Kategori</option>
                {kategoriJasa.map((kategori) => (
                  <option key={kategori.id} value={kategori.id}>
                    {kategori.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown Subkategori */}
            <div className="flex-1">
              <label
                htmlFor="subkategori"
                className="block text-sm font-medium text-gray-700"
              >
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
                {subkategoriJasa.map((subkategori) => (
                  <option key={subkategori.id} value={subkategori.id}>
                    {subkategori.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={() => {}}
                className="bg-yellow-300 text-black px-4 py-2 rounded-md hover:bg-yellow-500"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* List Pesanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pesananTersedia.map((pesanan) => (
            <Card key={pesanan.id} className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  {pesanan.subkategoriPesanan}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Pesanan atas nama <strong>{pesanan.namaPelanggan}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Biaya:</strong> Rp{" "}
                  {pesanan.totalBiaya.toLocaleString("id-ID")}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Sesi:</strong> {pesanan.sesi} hari
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Tanggal Pemesanan:</strong>{" "}
                  {new Date(pesanan.tanggalPemesanan).toLocaleDateString("id-ID")}
                </p>
                <button
                  onClick={() => handleKerjakanPesanan(pesanan.id)}
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
