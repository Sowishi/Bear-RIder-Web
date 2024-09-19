"use client";

import { Button, Table } from "flowbite-react";
import useCrudUsers from "../hooks/useCrudUsers";
import moment from "moment";

export function UserTable() {
  const { data, deleteUser } = useCrudUsers();

  const filterData = data.filter((item) => {
    if (item.role !== "Rider") {
      return item;
    }
  });

  return (
    <div className="overflow-x-auto shadow-xl">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Profile Picture</Table.HeadCell>
          <Table.HeadCell>Full Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone Number</Table.HeadCell>
          <Table.HeadCell>Date Join</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
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
                  <img width={50} src={user.profilePic} />
                </Table.Cell>
                <Table.Cell className="text-lg">
                  {user.firstName + " " + user.lastName}
                </Table.Cell>
                <Table.Cell className="text-lg">{user.email}</Table.Cell>{" "}
                <Table.Cell className="text-lg">{user.phoneNumber}</Table.Cell>{" "}
                <Table.Cell className="text-lg">{date}</Table.Cell>{" "}
                <Table.Cell className="text-lg">
                  {user.role ? user.role : "Customer"}
                </Table.Cell>{" "}
                <Table.Cell className="text-lg">
                  <Button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500"
                  >
                    Delete
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
