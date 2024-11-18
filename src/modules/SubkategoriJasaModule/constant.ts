export const subkategoriData = {
    penggunaPage: {
      subcategory: "Subkategori Jasa 1",
      category: "Kategori Jasa 2",
      description: "Ini adalah penjelasan untuk subkategori jasa 1 pada kategori jasa 2.",
      services: [
        { session: "Sesi Layanan 1", price: 100000 },
        { session: "Sesi Layanan 2", price: 200000 },
      ],
      workers: [
        { id: 1, name: "Worker 1" },
        { id: 2, name: "Worker 2" },
      ],
      testimonials: [
        {
          user: "User A",
          text: "Great service!",
          date: "2024-07-18",
          worker: "John Doe",
          rating: 5,
        },
      ],
    },
    pekerjaPage: {
      subcategory: "Subkategori Jasa 7",
      category: "Kategori Jasa 5",
      description: "Ini adalah penjelasan untuk subkategori jasa 7 pada kategori jasa 5.",
      services: [
        { session: "Sesi Layanan 3", price: 150000 },
        { session: "Sesi Layanan 4", price: 250000 },
      ],
      workers: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ],
      testimonials: [
        {
          user: "User B",
          text: "Excellent work!",
          date: "2024-08-28",
          worker: "Jane Smith",
          rating: 4,
        },
      ],
    },
  };

export const WorkerProfile = {
  name: "Andi Budi",
  rating: 5,
  completedOrders: 25,
  phoneNumber: "081344768979",
  birthDate: "01/01/1990",
  address: "Depok, Indonesia",
};
