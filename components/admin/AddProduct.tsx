import React, { useState, useEffect } from 'react';
import { getCategories, createProduct } from './helper/admin-api';
import { isAutheticated } from '../auth/helper/index';
import { Category, ProductFormValues } from './types';
import { ProductForm } from './ProductForm';
import { AdminLayout } from './layout';
import FormData from 'form-data';

const AddProduct = () => {
  const { user } = isAutheticated();
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

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    createProduct(user._id, values.formData).then(data => {
      if (data.error) {
        throw data.error;
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          price: '',
          photo: null,
          stock: '',
          formData: new FormData(),
        });
      }
    });
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
  };

  return (
    <AdminLayout title="Create new product">
      <ProductForm categories={categories} values={values} handleChange={handleChange} onSubmit={onSubmit} uploadPhoto={uploadPhoto} />
    </AdminLayout>
  );
};

export default AddProduct;
