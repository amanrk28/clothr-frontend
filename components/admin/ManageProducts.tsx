import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { isAutheticated } from '../auth/helper';
import { getProducts, deleteProduct } from './helper/admin-api';
import { Product } from 'components/types';
import { AdminLayout } from './layout';

const ManageProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const { user } = isAutheticated();

  const preload = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const updateThisProduct = (product: Product) => () => {
    router.push(`/admin/update/product/${product._id}`)
  }

  const deleteThisProduct = (product: Product) => () => {
    toast.promise(deleteProduct(product._id, user._id), {
      loading: `Deleting ${product.name}`,
      success: data => {
        if (data.error) throw data.error;
        else {
          preload();
          return 'Deleted product successfully'
        }
      },
      error: 'Failed to delete product',
    })
  };

  return (
    <AdminLayout title="Manage Products">
      {products.map((product, index) => (
        <div key={index} className="flex flex-col md:flex-row justify-between md:items-center border-b-2 p-2">
          <h3 className="text-xl">{product.name}</h3>
          <div className="flex justify-between text-center">
            <button onClick={updateThisProduct(product)} className="bg-blue-500 text-white px-4 py-2 rounded mx-2">
              Update
            </button>
            <button onClick={deleteThisProduct(product)} className="btn-grad-danger text-white px-4 py-2 rounded mx-2">
              Delete
            </button>
          </div>
        </div>
      ))}
    </AdminLayout>
  );
};

export default ManageProducts;
