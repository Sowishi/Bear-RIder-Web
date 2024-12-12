"use client";
import { Button, Table } from "flowbite-react";
import useCrudUsers from "../hooks/useCrudUsers";
import moment from "moment";
import { HiEye, HiTrash } from "react-icons/hi";
import { useState } from "react";
import { ConfirmModal } from "./confirmModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function UserTable({ search }) {
  const { data, deleteUser } = useCrudUsers();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState();
  const navigation = useNavigate();

  // Filter and search data
  const filterData = data.filter((item) => item.role !== "Rider");
  const searchData = filterData.filter((user) => {
    const fullName = (user.firstName + " " + user.lastName).toLocaleLowerCase();
    return fullName.includes(search.toLocaleLowerCase());
  });

  // Conditional rendering logic
  if (!data) {
    return <h1>Loading...</h1>; // Loading message if no data is fetched
  }

  if (searchData.length === 0) {
    return <h1>No users found.</h1>; // Message if no data matches the filter
  }

  return (
    <div className="overflow-x-auto shadow-xl">
      <ConfirmModal
        onSubmit={() => {
          deleteUser(selected.id);
          toast.success("Successfully Deleted User.");
          setDeleteModal(false);
        }}
        openModal={deleteModal}
        handleClose={() => setDeleteModal(false)}
      />

      <Table striped>
        <Table.Head>
          <Table.HeadCell>Profile Picture</Table.HeadCell>
          <Table.HeadCell>Full Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone Number</Table.HeadCell>
          <Table.HeadCell>Date Join</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>

          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>

          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {searchData.map((user) => {
            const firebasDate = user.createdAt.toDate();
            const date = moment(firebasDate).format("LLL");
            return (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <img width={50} src={user.profilePic} />
                </Table.Cell>
                <Table.Cell className="text-lg">
                  {user.firstName + " " + user.lastName}
                </Table.Cell>
                <Table.Cell className="text-lg">{user.email}</Table.Cell>
                <Table.Cell className="text-lg">{user.phoneNumber}</Table.Cell>
                <Table.Cell className="text-lg">{date}</Table.Cell>
                <Table.Cell className="text-lg">{user.status}</Table.Cell>

                <Table.Cell className="text-lg">
                  {user.role ? user.role : "Customer"}
                </Table.Cell>
                <Table.Cell className="text-lg flex items-center justify-center">
                  <Button
                    onClick={() => {
                      setDeleteModal(true);
                      setSelected(user);
                    }}
                    className="bg-red-500"
                  >
                    Delete
                    <HiTrash className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => {
                      navigation(`/admin-user/${user.id}`);
                    }}
                    className="bg-blue-500 ml-3"
                  >
                    View
                    <HiEye className="ml-2 h-5 w-5" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
