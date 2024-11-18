import { KategoriProps } from "./interface";

export const categories: KategoriProps[] = [
  {
    id: 1,
    name: "Kategori Jasa 1",
    subcategories: [
      { id: 101, name: "Subkategori Jasa 1" },
      { id: 102, name: "Subkategori Jasa 2" },
      { id: 103, name: "Subkategori Jasa 3" },
    ],
  },
  {
    id: 2,
    name: "Kategori Jasa 2",
    subcategories: [
      { id: 201, name: "Subkategori Jasa 1" },
      { id: 202, name: "Subkategori Jasa 2" },
    ],
  },
  {
    id: 3,
    name: "Kategori Jasa 3",
    subcategories: [
      { id: 301, name: "Subkategori Jasa 1" },
      { id: 302, name: "Subkategori Jasa 2" },
    ],
  },
];