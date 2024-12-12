import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../layout/admin";
import useCrudUsers from "../hooks/useCrudUsers";
import { Badge, Modal, Table, Select } from "flowbite-react";
import useCrudTransactions from "../hooks/useCrudTransaction";
import moment from "moment";

const ViewRider = () => {
  const { id } = useParams();
  const { getUser, updateUser } = useCrudUsers();
  const { getOwnTransaction } = useCrudTransactions();
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // To track block or unblock action
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState(moment().format("YYYY-MM-DD")); // Default to today's date

  useEffect(() => {
    const fetchUser = async () => {
      getUser(id, setUser);
      getOwnTransaction(id, setTransactions);
    };
    fetchUser();
  }, [id, getUser]);

  useEffect(() => {
    const filteredByPayment =
      paymentFilter === "All"
        ? transactions
        : transactions.filter(
            (transaction) => transaction.paymentMethod === paymentFilter
          );

    const filteredByDate = filteredByPayment.filter((transaction) => {
      const transactionDate = moment(transaction.createdAt.toDate()).format(
        "YYYY-MM-DD"
      );
      return transactionDate === dateFilter;
    });

    setFilteredTransactions(filteredByDate);
  }, [paymentFilter, dateFilter, transactions]);

  // Helper function to calculate summary
  const calculateSummary = (transactionList) => {
    const validTransactions = transactionList.filter((transaction) => {
      if (
        (transaction.paymentMethod == "Cash" ||
          transaction.paymentMethod == "Bear Wallet") &&
        transaction.status == "Completed"
      ) {
        return transaction;
      }
    });
    const total = validTransactions.reduce(
      (sum, transaction) => sum + transaction.totalPrice,
      0
    );
    const toRemitByRider = total * 0.3; // 30%
    const riderEarnings = total * 0.7; // 70%
    return { total, toRemitByRider, riderEarnings };
  };

  const dailySummary = calculateSummary(filteredTransactions);
  const generalSummary = calculateSummary(transactions);

  const handleUserAction = async () => {
    if (user) {
      const updatedStatus = actionType === "block" ? "Blocked" : "Active";
      await updateUser(id, { status: updatedStatus });
      setUser((prev) => ({ ...prev, status: updatedStatus }));
      alert(
        `User has been ${actionType === "block" ? "blocked" : "unblocked"}.`
      );
      setIsModalOpen(false);
    }
  };

  const convertWord = (text) => {
    if (text === "Pahatod") {
      return "Transportation";
    }

    if (text === "Padara") {
      return "Delivery";
    }
  };

  const getStatusColor = (status) => {
    if (status === "Completed") {
      return "success";
    }

    if (status === "Accepted") {
      return "info";
    }
  };

  if (!user) {
    return (
      <AdminLayout>
        <div className="container mx-auto mt-20 text-center">
          <p className="text-lg font-semibold">Loading user details...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Modal Component */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>
          {actionType === "block"
            ? "Confirm Block User"
            : "Confirm Unblock User"}
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to{" "}
            {actionType === "block" ? "block" : "unblock"} this user?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleUserAction}
            className={`${
              actionType === "block" ? "bg-red-500" : "bg-green-500"
            } text-white px-4 py-2 rounded-lg shadow hover:${
              actionType === "block" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            Confirm
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg shadow hover:bg-gray-400"
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      {/* Main Content */}
      <div className="container mx-auto mt-20">
        <div className="flex justify-between items-center px-10 pb-10">
          <h1 className="text-black text-3xl font-bold">Rider Transaction</h1>
          <div>
            {user.status === "Active" ? (
              <button
                onClick={() => {
                  setActionType("block");
                  setIsModalOpen(true);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
              >
                Block User
              </button>
            ) : (
              <button
                onClick={() => {
                  setActionType("unblock");
                  setIsModalOpen(true);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
              >
                Unblock User
              </button>
            )}
          </div>
        </div>

        {/* Summary Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg">Summary (Selected Date)</h3>
              <p>Total: ₱{dailySummary.total.toFixed(2)}</p>
              <p className="text-green-600">
                Rider Earnings (70%): ₱{dailySummary.riderEarnings.toFixed(2)}
              </p>
              <p className="text-blue-600">
                To Remit by Rider (30%): ₱
                {dailySummary.toRemitByRider.toFixed(2)}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg">General Summary (All Dates)</h3>
              <p>Total: ₱{generalSummary.total.toFixed(2)}</p>
              <p className="text-green-600">
                Rider Earnings (70%): ₱{generalSummary.riderEarnings.toFixed(2)}
              </p>
              <p className="text-blue-600">
                To Remit by Rider (30%): ₱
                {generalSummary.toRemitByRider.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex justify-between items-center mb-4">
          <Select
            id="paymentFilter"
            value={paymentFilter}
            color={"info"}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="All">All Payment Methods</option>
            <option value="Cash">Cash</option>
            <option value="Gcash">Gcash</option>
            <option value="Bear Wallet">Bear Wallet</option>
          </Select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </div>

        {/* Transaction Table */}
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Service Type</Table.HeadCell>
            <Table.HeadCell>Customer Name</Table.HeadCell>
            <Table.HeadCell>Rider Name</Table.HeadCell>
            <Table.HeadCell>Payment Method</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Total Price</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredTransactions?.map((item) => {
              const firebasDate = item.createdAt.toDate();
              const date = moment(firebasDate).format("LLL");
              const { currentUser } = item;
              const { rider } = item;

              return (
                <Table.Row
                  key={item.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="text-lg">
                    {convertWord(item.serviceType)}
                  </Table.Cell>
                  <Table.Cell className="text-lg">
                    <div className="wrapper flex items-center justify-start">
                      <img
                        className="mr-3"
                        width={50}
                        src={currentUser.profilePic}
                        alt=""
                      />
                      {currentUser.firstName + " " + currentUser.lastName}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-lg">
                    {rider && (
                      <div className="wrapper flex items-center justify-start">
                        <img
                          className="mr-3"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                          }}
                          src={rider?.selfieUrl}
                          alt=""
                        />
                        {rider?.firstName + " " + rider?.lastName}
                      </div>
                    )}
                    {!rider && "No Rider Yet"}
                  </Table.Cell>
                  <Table.Cell className="text-lg">
                    {item.paymentMethod}
                  </Table.Cell>
                  <Table.Cell className="text-lg">{date}</Table.Cell>
                  <Table.Cell className="text-lg">
                    ₱{item.totalPrice}
                  </Table.Cell>
                  <Table.Cell className="text-lg">
                    <Badge color={getStatusColor(item.status)}>
                      {item.status ? item.status : "Pending"}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default ViewRider;
