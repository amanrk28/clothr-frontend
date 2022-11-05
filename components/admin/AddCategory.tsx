import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { isAutheticated } from '../auth/helper';
import { createCategory } from './helper/admin-api';
import { AdminLayout } from './layout';
import { CategoryForm } from './CategoryForm';

const AddCategory = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const { user } = isAutheticated();

  const handleChange = (value: string) => {
    setName(value);
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!name) return toast.error('Enter category name to proceed!');
    toast.promise(createCategory(user._id, { name }), {
      loading: 'Creating new category...',
      success: data => {
        if (data.error) {
          throw data.error;
        } else {
          setName('');
          router.push('/admin/categories');
          return 'New category created';
        }
      },
      error: 'Failed to create category!',
    });
  };

  return (
    <AdminLayout title="Add new Category">
      <CategoryForm handleChange={handleChange} onSubmit={onSubmit} name={name} />
    </AdminLayout>
  );
};

export default AddCategory;
