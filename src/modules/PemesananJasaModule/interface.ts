export interface Order {
    id: number;
    subkategori: string;
    sesiLayanan: string;
    harga: number;
    namaPekerja: string;
    status: string;
    hasTestimonial: boolean;
}

export interface PemesananJasaProps {
    orders: Order[];
}  