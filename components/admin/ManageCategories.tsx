import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import Link from "next/link";
import { isAutheticated } from "../auth/helper";
import { deleteCategory, getCategories } from "./helper/admin-api";
import { LeftSide } from "components/user/AdminDashBoard";
import toast from "react-hot-toast";
import { Category } from "./types";

const ManageCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = isAutheticated();

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const onDeleteCategory = (category) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const userId = user._id;
    const categoryId = category._id;
    toast.promise(deleteCategory(categoryId, userId), {
      loading: `Deleting ${category.name} category...`,
      success: (data) => {
        if (data?.error) {
          throw data.error;
        } else {
          preload();
          return 'Category deleted successfully'
        }
      },
      error: 'Failed to delete category!'
    })
  }

  useEffect(() => {
    if (categories.length === 0)
      preload();
  }, []);

  return (
    <Base
      title="Manage your categories"
      description="Update or delete categories here"
      className="bg-green-600 p-4 flex justify-center items-start"
    >
      <div className="w-3/12">
        <LeftSide />
      </div>
      <div className="w-9/12">
        <div className="bg-white m-4 p-4 rounded">
          <h4 className="text-2xl font-medium text-green-600">Total {categories.length} Categories</h4>
          {categories.map((category, index) => (
            <div className="flex justify-between" key={index}>
              <h3 className="text-xl">
                {category.name}
              </h3>
              <div className="text-center mb-2">
                <Link
                  className="bg-blue-400 text-white px-4 py-2 rounded mx-2"
                  href={`/admin/product/update/${category._id}`}
                >
                  Update
                </Link>
                <button onClick={onDeleteCategory(category)} className="bg-red-400 text-white px-4 py-2 rounded mx-2">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
