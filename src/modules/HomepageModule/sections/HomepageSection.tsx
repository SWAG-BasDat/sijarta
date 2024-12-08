"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card"; // Assuming Card components are available
import { Badge } from "@/components/ui/badge"; // Assuming Badge components are available
import { Search, ChevronDown, List } from "lucide-react"; // Add ChevronDown icon from lucide-react

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Assuming API URL is stored in environment variables

export const HomepageSection = () => {
  const [categories, setCategories] = useState<any[]>([]); // Adjust type as necessary
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Function to fetch all categories
  const fetchAllCategories = async () => {
    if (!API_URL) {
      setError("API URL not configured");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const categoryRes = await fetch(`${API_URL}/kategorijasa`);
      if (!categoryRes.ok) {
        throw new Error("Failed to fetch categories");
      }

      const categoryData = await categoryRes.json();
      const mappedCategories = categoryData.map((category: any) => ({
        id: category.id,
        name: category.namakategori,
        subcategories: category.subcategories || [],
      }));

      setCategories(mappedCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch category by ID
  const fetchCategoryById = async (id: number) => {
    if (!API_URL) {
      setError("API URL not configured");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/kategorijasa/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch category");
      }

      const categoryData = await response.json();
      const mappedCategory = {
        id: categoryData.id,
        name: categoryData.namakategori,
        subcategories: categoryData.subcategories || [],
      };
      setCategories([mappedCategory]); // Set a single category (based on ID)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch all categories when no category is selected
    if (!selectedCategory) {
      fetchAllCategories();
    } else {
      // Fetch category by selected ID
      fetchCategoryById(selectedCategory);
    }
  }, [selectedCategory]); // Trigger whenever selectedCategory changes

  // Inside onChange handler of dropdown
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedCategory = Number(e.target.value) || null;
    console.log("selectedCategory updated to: ", newSelectedCategory);
    setSelectedCategory(newSelectedCategory);
  };

  // Filter categories based on the dropdown and search bar
  const filteredCategories = categories.filter((category) => {
    const matchesCategory = !selectedCategory || category.id === selectedCategory;
    const matchesCategoryName = category.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSubcategories =
      category.subcategories?.some((subcategory: any) =>
        subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || false;

    return matchesCategory && (matchesCategoryName || matchesSubcategories);
  });

  const handleRedirect = () => {
    router.push(`/subkategorijasa`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-blue-900">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">
            Kategori dan Subkategori Jasa
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Temukan berbagai jasa dan subkategori yang tersedia untuk memudahkan
            kebutuhan Anda.
          </p>
        </div>

        {/* Filter Dropdown & Search Bar */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          {/* Dropdown Button */}
          <div className="relative w-full md:w-1/3">
          <select
            value={selectedCategory ?? ""} // Ensure that selectedCategory is either a number or null
            onChange={(e) => setSelectedCategory(Number(e.target.value) || null)} // Set to null if no value is selected
            className="border border-gray-300 rounded-lg py-3 px-4 w-full bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 cursor-pointer transition-all hover:border-blue-600 appearance-none"
          >
            <option value="" className="py-2 px-4">
              Semua Kategori
            </option>
            {categories.map((category: any) => (
              <option key={category.id} value={category.id} className="py-2 px-4">
                {category.name}
              </option>
            ))}
          </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-2/3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari Subkategori"
              className="border rounded-lg p-3 w-full bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Kategori dan Subkategori Card */}
        <div className="grid gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-blue-900">
              <div className="flex items-center gap-3">
                <List className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-semibold text-white">
                  Daftar Kategori dan Subkategori Jasa
                </h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.length === 0 && (
                  <div className="text-center text-gray-500">
                    Tidak ada kategori.
                  </div>
                )}

                {/* Render filtered categories */}
                {filteredCategories.map((category: any) => (
                  <Card
                    key={category.id}
                    className="border hover:border-blue-900 transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 border-blue-900 text-blue-900"
                        >
                          {category.name} {/* Always display the category name */}
                        </Badge>
                      </div>
                      <ul className="space-y-4">
                        {/* Check if subcategories exist */}
                        {category.subcategories?.length > 0 ? (
                          category.subcategories
                            .filter((subcategory: any) =>
                              subcategory.name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            )
                            .map((subcategory: any) => (
                              <li
                                key={subcategory.id}
                                onClick={() => handleRedirect()}
                                className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                {subcategory.name}
                              </li>
                            ))
                        ) : (
                          <div className="text-gray-500">Tidak ada subkategori</div>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
