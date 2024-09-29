"use client";

import { Badge, Button, Table, Toast } from "flowbite-react";
import useCrudUsers from "../hooks/useCrudUsers";
import moment from "moment";
import useCrudTransactions from "../hooks/useCrudTransaction";
import { HiTrash } from "react-icons/hi";
import { useState } from "react";
import { ConfirmModal } from "./confirmModal";
import { toast } from "react-toastify";

export function TransactionTable({ search }) {
  const { data, deleteTransaction } = useCrudTransactions();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState();

  const filterData = data.filter((item) => {
    if (item.role !== "Rider") {
      return item;
    }
  });

  const searchData = filterData.filter((user) => {
    const fullNameRider = user.rider?.fullName.toLocaleLowerCase();
    const fullNameUser = (
      user.currentUser.firstName +
      " " +
      user.currentUser.lastName
    ).toLocaleLowerCase();

    if (fullNameUser.includes(search.toLocaleLowerCase())) {
      return user;
    }
  });

  const convertWord = (text) => {
    if (text == "Pahatod") {
      return "Transportation";
    }

    if (text == "Padara") {
      return "Delivery";
    }
  };

  const getStatusColor = (status) => {
    if (status == "Completed") {
      return "success";
    }

    if (status == "Accepted") {
      return "info";
    }
  };

  return (
    <div className="overflow-x-auto shadow-xl">
      <ConfirmModal
        onSubmit={() => {
          deleteTransaction(selected.id);
          setDeleteModal(false);
          toast.success("Successfull Deleted Transaction.");
        }}
        openModal={deleteModal}
        handleClose={() => setDeleteModal(false)}
      />

      <Table striped>
        <Table.Head>
          <Table.HeadCell>Service Type</Table.HeadCell>
          <Table.HeadCell>Customer Name</Table.HeadCell>
          <Table.HeadCell>Rider Name</Table.HeadCell>
          <Table.HeadCell>Distance</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>

          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {searchData?.map((item) => {
            const firebasDate = item.createdAt.toDate();
            const date = moment(firebasDate).format("LLL");
            const { currentUser } = item;
            const { rider } = item;

            return (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="text-lg">
                  {convertWord(item.serviceType)}
                </Table.Cell>{" "}
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
                </Table.Cell>{" "}
                <Table.Cell className="text-lg">
                  {rider && (
                    <div className="wrapper flex items-center justify-start">
                      <img
                        className="mr-3"
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        src={rider?.selfieUrl}
                        alt=""
                      />
                      {rider?.fullName}
                    </div>
                  )}
                  {!rider && "No Rider Yet"}
                </Table.Cell>
                <Table.Cell className="text-lg">{item.distance} km</Table.Cell>
                <Table.Cell className="text-lg">{date}</Table.Cell>
                <Table.Cell className="text-lg"> ₱{item.totalPrice}</Table.Cell>
                <Table.Cell className="text-lg">
                  <Badge color={getStatusColor(item.status)}>
                    {item.status ? item.status : "Pending"}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="text-lg">
                  <Button
                    onClick={() => {
                      setDeleteModal(true);
                      setSelected(item);
                    }}
                    className="bg-red-500"
                  >
                    Delete
                    <HiTrash className="ml-2 h-5 w-5" />
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
