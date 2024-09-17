"use client";

import { Button, Drawer } from "flowbite-react";
import { useState } from "react";

export function BearDrawer({ open, handleClose }) {
  return (
    <>
      <Drawer open={open} onClose={handleClose}>
        <Drawer.Header title="Menu" className="mb-10" />
        <Drawer.Items>
          <div className="wrapper bg-red-200 p-3 rounded-lg my-3">
            <h1 className="font-bold">Dashboard</h1>
          </div>
          <div className="wrapper bg-yellow-200 p-3 rounded-lg my-3">
            <h1 className="font-bold">Transaction</h1>
          </div>
          <div className="wrapper bg-yellow-200 p-3 rounded-lg my-3">
            <h1 className="font-bold">User Management</h1>
          </div>
          <div className="wrapper bg-yellow-200 p-3 rounded-lg my-3">
            <h1 className="font-bold">View Site</h1>
          </div>
          <div className="wrapper bg-yellow-200 p-3 rounded-lg my-3">
            <h1 className="font-bold">Log out</h1>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
