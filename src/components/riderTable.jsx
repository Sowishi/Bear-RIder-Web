"use client";

import { Badge, Button, Table } from "flowbite-react";
import useCrudUsers from "../hooks/useCrudUsers";
import moment from "moment";
import BearModal from "./bearModal";
import { useState } from "react";

export function RiderTable() {
  const { data, acceptRider, deleteUser } = useCrudUsers();
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filterData = data.filter((item) => {
    if (item.role == "Rider") {
      return item;
    }
  });

  const getStatusColor = (status) => {
    if (status == "Verified") {
      return "success";
    }

    if (status == "Pending") {
      return "info";
    }
  };

  return (
    <div className="overflow-x-auto shadow-xl">
      {selectedUser && (
        <BearModal
          acceptRider={acceptRider}
          user={selectedUser}
          openModal={openModal}
          handleClose={() => setOpenModal(false)}
        />
      )}
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Profile Picture</Table.HeadCell>
          <Table.HeadCell>Full Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone Number</Table.HeadCell>
          <Table.HeadCell>Date Join</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>

          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filterData?.map((user) => {
            const firebasDate = user.createdAt.toDate();
            const date = moment(firebasDate).format("LLL");
            return (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <img
                    style={{ borderRadius: "100%", width: 50, height: 50 }}
                    src={user.selfieUrl}
                  />
                </Table.Cell>
                <Table.Cell className="text-lg">{user.fullName}</Table.Cell>
                <Table.Cell className="text-lg">{user.email}</Table.Cell>{" "}
                <Table.Cell className="text-lg">{user.phoneNumber}</Table.Cell>{" "}
                <Table.Cell className="text-lg">{date}</Table.Cell>{" "}
                <Table.Cell className="text-lg">
                  <Badge color={getStatusColor(user.riderStatus)}>
                    {user.riderStatus}
                  </Badge>
                </Table.Cell>{" "}
                <Table.Cell className="text-lg flex items-center justify-start">
                  <Button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500"
                  >
                    Delete
                  </Button>
                  <Button
                    className="bg-blue-500 ml-3"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenModal(true);
                    }}
                  >
                    View Rider
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
