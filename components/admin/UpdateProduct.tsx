import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  getCategories,
  getProduct,
  updateProduct,
} from './helper/admin-api';
import { isAutheticated } from '../auth/helper';
import { Category, ProductFormValues } from './types';
import { ProductForm } from './ProductForm';
import { AdminLayout } from './layout';
import FormData from 'form-data';

const UpdateProduct = () => {
  const { user } = isAutheticated();
  const router = useRouter();

  const [values, setValues] = useState<ProductFormValues>({
    name: '',
    description: '',
    price: '',
    stock: '',
    photo: null,
    category: '',
    formData: new FormData(),
  });

  const [categories, setCategories] = useState<Category[]>([]);

  const preloadCategories = useCallback(() => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  }, []);

  const preload = useCallback(() => {
    if (!router.query.productId) return;
    getProduct(router.query?.productId?.toString()).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  }, [preloadCategories, router.query.productId, values]);

  useEffect(() => {
    preload();
  }, [preload, router.query]);

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toast.promise(
      updateProduct(router.query.productId.toString(), user._id, values.formData), {
      loading: `Updating ${values.name} details...`,
      success: data => {
        if (data.error) {
          throw data.error;
        } else {
          router.push('/admin/products')
          return 'Product Details Updated';
        }
      },
      error: 'Failed to update product details!',
    })
  };

  const handleChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { value } = event.target;
    values.formData.append(fieldName, value);
    setValues({ ...values, [fieldName]: value });
  };

  const uploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    values.formData.append('photo', files[0]);
    setValues({ ...values, photo: files[0] });
  }

  return (
    <AdminLayout
      title="Update product details"
    >
      <ProductForm isUpdate categories={categories} values={values} handleChange={handleChange} uploadPhoto={uploadPhoto} onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default UpdateProduct;
