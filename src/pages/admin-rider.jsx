import { useState } from "react";
import { RiderTable } from "../components/riderTable";
import AdminLayout from "../layout/admin";
import { TextInput } from "flowbite-react";

const AdminRider = () => {
  const [search, setSearch] = useState("");

  return (
    <AdminLayout>
      <div className="container mx-auto mt-20">
        <div className="header flex justify-between items-center mb-10">
          <h1 className="font-bold text-3xl">Rider Management</h1>
          <TextInput
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search User..."
            style={{ minWidth: 300 }}
          />
        </div>
        <RiderTable search={search} />
      </div>
    </AdminLayout>
  );
};

export default AdminRider;
