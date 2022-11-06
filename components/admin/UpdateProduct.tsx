import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  getCategories,
  getProduct,
  updateProduct,
} from './helper/admin-api';
import { useAutheticate } from '../auth/helper';
import { Category, ProductFormValues } from './types';
import { ProductForm } from './ProductForm';
import { AdminLayout } from './layout';
import FormData from 'form-data';

const UpdateProduct = () => {
  const { user } = useAutheticate();
  const router = useRouter();

  const [values, setValues] = useState<ProductFormValues & { formData: FormData }>({
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

  const preload = () => {
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
  };
  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
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
      error: err => err || 'Failed to update product details!',
    })
  };

  const handleChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      {categories.length > 0 ? (
        <ProductForm isUpdate categories={categories} values={values} handleChange={handleChange} uploadPhoto={uploadPhoto} onSubmit={onSubmit} />
      ) : null}
    </AdminLayout>
  );
};

export default UpdateProduct;
