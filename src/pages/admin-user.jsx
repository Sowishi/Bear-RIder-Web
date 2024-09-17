import { UserTable } from "../components/userTable";
import AdminLayout from "../layout/admin";

const AdminUser = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto mt-20">
        <h1 className="font-bold text-3xl mb-10">User Management</h1>
        <UserTable />
      </div>
    </AdminLayout>
  );
};

export default AdminUser;
