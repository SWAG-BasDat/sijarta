"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "../constant";

export const HomepageSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  // Filter kategori berdasarkan dropdown dan search bar
  const filteredCategories = categories.filter(
    (category) =>
      (!selectedCategory || category.id === selectedCategory) &&
      category.subcategories.some((subcategory) =>
        subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Handle redirect ke halaman Subkategori Jasa & Sesi Layanan
  const handleRedirect = (subcategory: string) => {
    router.push(`/subcategories/${subcategory}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Daftar Jasa dan Subkategori</h1>

      {/* Filter Dropdown & Search */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(Number(e.target.value) || null)}
          className="border rounded-lg p-2 w-full md:w-1/3"
        >
          <option value="">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari Subkategori"
          className="border rounded-lg p-2 w-full md:w-2/3"
        />
      </div>

      {/* Daftar Kategori dan Subkategori */}
      <div className="space-y-6">
        {/* Show all categories by default if no search term */}
        {filteredCategories.length === 0 && !searchTerm && (
          <div>
            {categories.map((category) => (
              <div key={category.id} className="border-b pb-4">
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <ul className="mt-2 space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <li
                      key={subcategory}
                      onClick={() => handleRedirect(subcategory)}
                      className="cursor-pointer text-blue-600 hover:underline"
                    >
                      {subcategory}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Show filtered categories when search term exists */}
        {filteredCategories.length === 0 && searchTerm && (
          <p className="text-gray-500 text-center">Tidak ada subkategori yang ditemukan.</p>
        )}

        {filteredCategories.map((category) => (
          <div key={category.id} className="border-b pb-4">
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <ul className="mt-2 space-y-2">
              {category.subcategories
                .filter((subcategory) =>
                  subcategory.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((subcategory) => (
                  <li
                    key={subcategory}
                    onClick={() => handleRedirect(subcategory)}
                    className="cursor-pointer text-blue-600 hover:underline"
                  >
                    {subcategory}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};