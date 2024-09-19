"use client";

import { Button, ListGroup, Modal } from "flowbite-react";
import moment from "moment";
import { useState } from "react";

export default function BearModal({ openModal, handleClose, user }) {
  const firebaseDate = user.createdAt.toDate();
  const date = moment(firebaseDate).format("LLL");
  return (
    <>
      {user && (
        <Modal size={"2xl"} show={openModal} onClose={handleClose}>
          <Modal.Header>Rider Information</Modal.Header>
          <Modal.Body>
            <div className="container mx-auto flex items-center justify-center flex-col">
              <img
                style={{ borderRadius: "100%", width: 200, height: 200 }}
                src={user.selfieUrl}
              />{" "}
              <div className="div">
                <h1 className="text-3xl font-bold mt-5">{user.fullName}</h1>
              </div>
              <ListGroup className="w-full mt-5">
                <ListGroup.Item disabled>{user.email}</ListGroup.Item>{" "}
                <ListGroup.Item disabled>{user.phoneNumber}</ListGroup.Item>{" "}
                <ListGroup.Item disabled>{user.riderStatus}</ListGroup.Item>{" "}
                <ListGroup.Item disabled>{date}</ListGroup.Item>
              </ListGroup>
              <div className="w-full flex justify-center items-center flex-col my-5">
                <div className="w-full">
                  <h1 className="font-bold text-3xl text-left ">Documents</h1>
                </div>
                <img
                  style={{ width: 200, height: 200 }}
                  src={user.licenseUrl}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpenModal(false)}>Accept Rider</Button>
            <Button color="gray" onClick={handleClose}>
              Decline
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
