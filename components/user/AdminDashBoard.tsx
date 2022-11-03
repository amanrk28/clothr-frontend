import Link from "next/link";
import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";

const navbarLinks = [
  { name: 'Create Categories', link: '/admin/create/category' },
  { name: 'Manage Categories', link: '/admin/categories' },
  { name: 'Create Products', link: '/admin/create/product' },
  { name: 'Manage Products', link: '/admin/products' },
  { name: 'Manage Orders', link: '/admin/orders' },
]

export const LeftSide = () => {
  return (
    <div className="flex flex-col items-start bg-white rounded m-4 p-4">
      <h4 className="text-green-600 text-2xl font-medium p-4">
        <Link href="/admin/dashboard">
          Admin
        </Link>
      </h4>
      <div className="flex flex-col p-4">
        {navbarLinks.map((item, index) => (
          <Link key={index} href={item.link} className="py-4 pr-20 hover:scale-110 hover:font-medium transition-all ease-out duration-300">
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

const AdminInfo = () => {
  const { user } = isAutheticated();
  return (
    <div className="bg-white m-4 p-4 h-full rounded">
      <h4 className="text-green-600 text-2xl">Admin Information</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge badge-success mr-2">Name:</span> {user?.name}
        </li>
        <li className="list-group-item">
          <span className="badge badge-success mr-2">Email:</span> {user?.email}
        </li>
      </ul>
    </div>
  )
}

const AdminDashBoard = () => {
  return (
    <Base
      title="Admin Area"
      description="Manage all of your products here"
      className="bg-green-600 p-4 flex justify-center items-start"
    >
      <div className="w-3/12 max-h-[500px]">
        <LeftSide />
      </div>
      <div className="w-9/12">
        <AdminInfo />
      </div>
    </Base>
  );
};

export default AdminDashBoard;
