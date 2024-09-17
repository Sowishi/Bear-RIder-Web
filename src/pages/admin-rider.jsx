import { RiderTable } from "../components/riderTable";
import AdminLayout from "../layout/admin";

const AdminRider = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto mt-20">
        <h1 className="font-bold text-3xl mb-10">User Management</h1>
        <RiderTable />
      </div>
    </AdminLayout>
  );
};

export default AdminRider;
