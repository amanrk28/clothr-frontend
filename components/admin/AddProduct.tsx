import FormData from 'form-data';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getCategories, createProduct } from './helper/admin-api';
import { AdminLayout } from './layout';
import { ProductForm } from './ProductForm';
import { Category, ProductFormValues } from './types';
import { useAutheticate } from '../auth/helper/index';

const fields = ['name', 'description', 'price', 'stock', 'photo', 'category'];

const initialState = {
  name: '',
  description: '',
  price: '',
  stock: '',
  photo: null,
  category: '',
  formData: new FormData(),
}

const AddProduct = () => {
  const { user } = useAutheticate();
  const [values, setValues] = useState<ProductFormValues & { formData: FormData }>(initialState);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { name, description, price, photo, stock, category } = values;
    if (!name && !description && !price && !stock && !photo && !category) {
      return toast.error('Enter all details to proceed!')
    }
    fields.forEach(field => {
      values.formData.append(field, values[field]);
    })

    toast.promise(createProduct(user._id, values.formData), {
      loading: 'Creating new product...',
      success: data => {
        if (data.error) {
          throw data.error;
        } else {
          setValues(initialState);
          router.push('/admin/products');
          return `New product created`;
        }
      },
      error: err => err || 'Failed to create product',
    })
  };

  const handleChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValues({ ...values, [fieldName]: value });
  };

  const uploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    setValues({ ...values, photo: files[0] });
  };

  return (
    <AdminLayout title="Create new product">
      {categories.length > 0 ? (
        <ProductForm categories={categories} values={values} handleChange={handleChange} onSubmit={onSubmit} uploadPhoto={uploadPhoto} />
      ) : null}
    </AdminLayout>
  );
};

export default AddProduct;
