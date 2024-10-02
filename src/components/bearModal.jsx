"use client";

import { Badge, Button, ListGroup, Modal } from "flowbite-react";
import moment from "moment";
import { useState } from "react";

export default function BearModal({
  openModal,
  handleClose,
  user,
  acceptRider,
}) {
  const firebaseDate = user.createdAt.toDate();
  const date = moment(firebaseDate).format("LLL");
  return (
    <>
      {user && (
        <Modal size={"5xl"} show={openModal} onClose={handleClose}>
          <Modal.Header>Rider Information</Modal.Header>
          <Modal.Body>
            <div className="container mx-auto flex items-center justify-center flex-col">
              <img
                style={{
                  borderRadius: "100%",
                  width: 200,
                  height: 200,
                  objectFit: "cover",
                }}
                src={user.selfieUrl}
              />{" "}
              <div className="div">
                <h1 className="text-3xl font-bold mt-5">
                  {" "}
                  {user?.firstName + " " + user?.lastName}
                </h1>
              </div>
              <ListGroup className="w-full mt-5">
                <ListGroup.Item disabled>{user.email}</ListGroup.Item>{" "}
                <ListGroup.Item disabled>{user.phoneNumber}</ListGroup.Item>{" "}
                <ListGroup.Item disabled>{user.riderStatus}</ListGroup.Item>{" "}
                <ListGroup.Item disabled>{date}</ListGroup.Item>
              </ListGroup>
              <div className="w-full flex justify-center items-center flex-col my-5">
                <div className="w-full">
                  <h1 className="font-bold text-3xl text-left ">
                    Driver's License
                  </h1>
                </div>
                <div className="flex w-full my-10">
                  <div className="basis-6/12 flex justify-center items-center">
                    <a href={user.frontLicenseUrl} target="_blank">
                      <Badge color={"info"} className="mb-3 py-2 w-6/12">
                        Front License
                      </Badge>
                      <img
                        style={{ width: 350, height: 350, borderRadius: 10 }}
                        src={user.frontLicenseUrl}
                      />
                    </a>
                  </div>
                  <div className="basis-6/12 flex justify-center items-center">
                    <a href={user.backLicenseUrl} target="_blank">
                      <Badge color={"info"} className="mb-3 py-2 w-6/12">
                        Back License
                      </Badge>{" "}
                      <img
                        style={{ width: 350, height: 350, borderRadius: 10 }}
                        src={user.backLicenseUrl}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center items-center flex-col my-5">
                <div className="w-full">
                  <h1 className="font-bold text-3xl text-left ">
                    Vehicle Documents
                  </h1>
                </div>
                <div className="flex w-full my-10">
                  <div className="basis-6/12 flex justify-center items-center">
                    <a href={user.ORUrl} target="_blank">
                      <Badge color={"info"} className="mb-3 py-2 w-6/12">
                        Official Receipt
                      </Badge>{" "}
                      <img
                        style={{ width: 350, height: 350, borderRadius: 10 }}
                        src={user.ORUrl}
                      />
                    </a>
                  </div>
                  <div className="basis-6/12 flex justify-center items-center">
                    <a href={user.CRUrl} target="_blank">
                      <Badge color={"info"} className="mb-3 py-2 w-6/12">
                        Certificate of Registration
                      </Badge>{" "}
                      <img
                        style={{ width: 350, height: 350, borderRadius: 10 }}
                        src={user.CRUrl}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center items-center flex-col my-5">
                <div className="w-full">
                  <h1 className="font-bold text-3xl text-left ">
                    Government Clearance
                  </h1>
                </div>
                <div className="flex w-full my-10">
                  <div className="basis-6/12 flex justify-center items-center">
                    <a href={user.ORUrl} target="_blank">
                      <Badge color={"info"} className="mb-3 py-2 w-6/12">
                        Clearance
                      </Badge>{" "}
                      <img
                        style={{ width: 350, height: 350, borderRadius: 10 }}
                        src={user.clearanceUrl}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color={"success"}
              onClick={() => {
                acceptRider(user.id);
                handleClose();
              }}
            >
              Accept Rider
            </Button>
            <Button color="gray" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
