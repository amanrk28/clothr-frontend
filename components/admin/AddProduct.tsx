import React, { useState, useEffect } from 'react';
import { getCategories, createProduct } from './helper/admin-api';
import { isAutheticated } from '../auth/helper/index';
import { Category, ProductFormValues } from './types';
import { ProductForm } from './ProductForm';
import { AdminLayout } from './layout';
import FormData from 'form-data';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

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
  const { user } = isAutheticated();
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

  const onSubmit = () => {
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
      error: 'Failed to create product',
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
