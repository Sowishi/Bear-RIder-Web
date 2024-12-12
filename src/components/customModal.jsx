import React from "react";
import { Modal, Button } from "flowbite-react";

const CustomModal = ({ isOpen, onClose, title, children, onConfirm }) => {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">{children}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm} color="success">
          Confirm
        </Button>
        <Button onClick={onClose} color="gray">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
