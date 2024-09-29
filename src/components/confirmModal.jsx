"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function ConfirmModal({ openModal, handleClose, onSubmit }) {
  return (
    <>
      <Modal show={openModal} size="md" onClose={handleClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this?
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={onSubmit} color="failure">
                {"Yes, I'm sure"}
              </Button>
              <Button onClick={handleClose} color="gray">
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
