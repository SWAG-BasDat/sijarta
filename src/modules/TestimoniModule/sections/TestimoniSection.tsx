"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Testimoni } from "../interface";

const TestimoniSection = ({ id_subkategori }: { id_subkategori?: string }) => {
  const [testimonials, setTestimonials] = useState<Testimoni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      if (!id_subkategori) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/testimoni/subkategori/${id_subkategori}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Tidak dapat memuat testimoni saat ini");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [id_subkategori]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 bg-blue-900 rounded-t-lg">
              <h2 className="text-2xl font-semibold text-white">
                Testimoni Pelanggan
              </h2>
            </div>
            <div className="p-6">
              <div className="text-center text-gray-600">
                Memuat testimoni...
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 bg-blue-900 rounded-t-lg">
            <h2 className="text-2xl font-semibold text-white">
              Testimoni Pelanggan
            </h2>
          </div>
          <div className="p-6">
            {error ? (
              <div className="text-center text-red-600 p-4">{error}</div>
            ) : testimonials.length === 0 ? (
              <div className="text-center text-gray-600 p-4">
                Belum ada testimoni untuk layanan ini.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testi) => (
                  <Card key={testi.idtrpemesanan} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">
                            {testi.nama_pelanggan}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(testi.tgl)}
                          </p>
                          <p className="text-sm text-blue-600 mt-1">
                            {testi.nama_jasa}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: testi.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{testi.teks}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimoniSection;
