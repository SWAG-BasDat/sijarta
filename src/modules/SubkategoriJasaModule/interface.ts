export interface Service {
  session: string;
  price: number;
  sub_kategori_id: string;
}

export interface PemesananModalProps {
  service: Service;
  onClose: () => void;
  onSubmit: (session: string, userName: string) => void;
}
export interface Testimonial {
  user: string;
  text: string;
  date: string;
  worker: string;
  rating: number;
}

export interface Worker {
  id: number;
  name: string;
}

export interface SubkategoriProps {
  subcategory: string;
  category: string;
  name: string;
  categoryid: string;
  description: string;
  services: Service[];
  workers: Worker[];
  testimonials: Testimonial[];
}
export interface ProfilePekerjaProps {
  name: string;
  rating: number;
  completedOrders: number;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
}
