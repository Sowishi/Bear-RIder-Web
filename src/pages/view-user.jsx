import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../layout/admin";
import useCrudUsers from "../hooks/useCrudUsers";
import { Modal } from "flowbite-react";

const ViewUser = () => {
  const { id } = useParams();
  const { getUser, updateUser } = useCrudUsers();
  const [user, setUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      getUser(id, setUser);
    };
    fetchUser();
  }, [id, getUser]);

  const handleBlockUser = async () => {
    if (user) {
      await updateUser(id, { status: "Blocked" });
      setUser((prev) => ({ ...prev, status: "Blocked" }));
      alert("User has been blocked.");
      setIsModalOpen(false);
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
      <div className="container mx-auto mt-20">
        <div className="header flex justify-between items-center mb-10">
          <h1 className="font-bold text-3xl">User Profile</h1>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Field</th>
                <th className="px-4 py-2 border">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border font-medium">
                  Profile Picture
                </td>
                <td className="px-4 py-2 border">
                  <img
                    src={user.profilePic}
                    alt={`${user.firstName}'s profile`}
                    className="w-16 h-16 rounded-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-medium">First Name</td>
                <td className="px-4 py-2 border">{user.firstName}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-medium">Last Name</td>
                <td className="px-4 py-2 border">{user.lastName}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-medium">Middle Name</td>
                <td className="px-4 py-2 border">{user.middleName || "N/A"}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-medium">Email</td>
                <td className="px-4 py-2 border">{user.email}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-medium">Phone Number</td>
                <td className="px-4 py-2 border">
                  {user.phoneNumber || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-medium">Created At</td>
                <td className="px-4 py-2 border">
                  {new Date(user.createdAt.seconds * 1000).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-medium">Status</td>
                <td className="px-4 py-2 border">{user.status || "Active"}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-medium">ID</td>
                <td className="px-4 py-2 border">{user.id}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-6 text-right">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
            >
              Block User
            </button>
          </div>
        </div>

        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Modal.Header>Confirm Block User</Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to block this user?</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={handleBlockUser}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
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
      </div>
    </AdminLayout>
  );
};

export default ViewUser;
