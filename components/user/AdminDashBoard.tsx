import React from 'react';
import { useAutheticate } from '../auth/helper/index';
import { AdminLayout } from 'components/admin/layout';

const AdminDashBoard = () => {
  const { user } = useAutheticate();
  return (
    <AdminLayout title="Admin Information">
      <div className="flex flex-col items-start">
        <div>
          <span className="mr-2">Name:</span> {user?.name}
        </div>
        <div>
          <span className="mr-2">Email:</span> {user?.email}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashBoard;
