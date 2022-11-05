import FormData from 'form-data';
export interface Category {
    name: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
}

export interface ProductFormValues {
    name: string
    description: string
    price: string
    stock: string
    photo: File | null
    category: string
    formData: FormData,
}
