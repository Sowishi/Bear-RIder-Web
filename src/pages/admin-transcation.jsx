import { TextInput } from "flowbite-react";
import { TransactionTable } from "../components/transactionTable";
import AdminLayout from "../layout/admin";
import { useState } from "react";

const AdminTransaction = () => {
  const [search, setSearch] = useState("");

  return (
    <AdminLayout>
      <div className="container mx-auto mt-20">
        <div className="header flex justify-between items-center mb-10">
          <h1 className="font-bold text-3xl">Transactions</h1>
          <TextInput
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search User..."
            style={{ minWidth: 300 }}
          />
        </div>{" "}
        <TransactionTable search={search} />
      </div>
    </AdminLayout>
  );
};

export default AdminTransaction;
