import { TransactionTable } from "../components/transactionTable";
import AdminLayout from "../layout/admin";

const AdminTransaction = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto mt-20">
        <h1 className="font-bold text-3xl mb-10">Transactions</h1>
        <TransactionTable />
      </div>
    </AdminLayout>
  );
};

export default AdminTransaction;
