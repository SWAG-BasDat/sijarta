import { useState } from 'react';
import { useRouter } from 'next/router';

type Category = {
  id: number;
  name: string;
  subcategories: string[];
};

const categories: Category[] = [
  { id: 1, name: 'Kategori Jasa 1', subcategories: ['Subkategori Jasa 1', 'Subkategori Jasa 2', 'Subkategori Jasa 3'] },
  { id: 2, name: 'Kategori Jasa 2', subcategories: ['Subkategori Jasa 1', 'Subkategori Jasa 2'] },
  { id: 3, name: 'Kategori Jasa 3', subcategories: ['Subkategori Jasa 1', 'Subkategori Jasa 2'] },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  const filteredCategories = categories.filter(category =>
    !selectedCategory || category.id === selectedCategory
  );

  const handleRedirect = (subcategory: string) => {
    router.push(`/subcategories/${subcategory}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Homepage</h1>
      
      {/* Dropdown Filter */}
      <select
        value={selectedCategory || ''}
        onChange={(e) => setSelectedCategory(Number(e.target.value) || null)}
        className="border rounded p-2 mr-2"
      >
        <option value="">Semua Kategori</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      
      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Nama Subkategori"
        className="border rounded p-2"
      />
      
      <div className="mt-4">
        {filteredCategories.map((category) => (
          <div key={category.id}>
            <h2 className="font-semibold">{category.name}</h2>
            {category.subcategories
              .filter((subcategory) => subcategory.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((subcategory) => (
                <div
                  key={subcategory}
                  onClick={() => handleRedirect(subcategory)}
                  className="cursor-pointer text-blue-500 hover:underline"
                >
                  {subcategory}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}