export interface Service {
    session: string;
    price: number;
}

export interface Testimonial {
    user: string;
    text: string;
    date: string;
    worker: string;
    rating: number;
}

export interface SubkategoriProps {
    subcategory: string;
    category: string;
    description: string;
    services: Service[];
    workers: string[];
    testimonials: Testimonial[];
}

export interface PemesananModalProps {
    service: Service;
    onClose: () => void;
    onSubmit: (serviceName: string, userName: string) => void;
  }