import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useAutheticate } from '../auth/helper';
import { deleteCategory, getCategories } from './helper/admin-api';
import toast from 'react-hot-toast';
import { Category } from './types';
import { AdminLayout } from './layout';

const ManageCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const { user } = useAutheticate();

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const onUpdateCategory = (category: Category) => () => {
    router.push(`/admin/update/category/${category._id}`)
  }

  const onDeleteCategory = category => () => {
    const userId = user._id;
    const categoryId = category._id;
    toast.promise(deleteCategory(categoryId, userId), {
      loading: `Deleting ${category.name} category...`,
      success: data => {
        if (data?.error) {
          throw data.error;
        } else {
          preload();
          return 'Category deleted successfully'
        }
      },
      error: 'Failed to delete category!',
    })
  }

  useEffect(() => {
    preload();
  }, []);

  return (
    <AdminLayout title="Manage your categories">
      {categories.map((category, index) => (
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 p-2 even:bg-neutral-800" key={index}>
          <h3 className="text-xl">{category.name}</h3>
          <div className="flex justify-between text-center my-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded md:mx-2"
              onClick={onUpdateCategory(category)}
            >
              Update
            </button>
            <button onClick={onDeleteCategory(category)} className="btn-grad-danger text-white px-4 py-2 rounded md:mx-2">
              Delete
            </button>
          </div>
        </div>
      ))}
    </AdminLayout>
  );
};

export default ManageCategories;
