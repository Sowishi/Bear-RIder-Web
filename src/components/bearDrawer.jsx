"use client";

import { Button, Drawer } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function BearDrawer({ open, handleClose }) {
  return (
    <>
      <Drawer open={open} onClose={handleClose}>
        <Drawer.Header title="Menu" className="mb-10" />
        <Drawer.Items>
          <div className="wrapper bg-red-200 p-3 rounded-lg my-3">
            <Link to={"/admin-dashboard"}>
              <h1 className="font-bold">Dashboard</h1>
            </Link>{" "}
          </div>
          <div className="wrapper bg-yellow-200 p-3 rounded-lg my-3">
            <Link to={"/admin-user"}>
              <h1 className="font-bold">User Management</h1>
            </Link>
          </div>
          <div className="wrapper bg-yellow-200 p-3 rounded-lg my-3">
            <Link to={"/admin-rider"}>
              <h1 className="font-bold">Rider Management</h1>
            </Link>{" "}
          </div>
          <div className="wrapper bg-yellow-200 p-3 rounded-lg my-3">
            <Link to={"/admin-transaction"}>
              <h1 className="font-bold">Transactions</h1>
            </Link>{" "}
          </div>

          <div className="wrapper bg-yellow-200 p-3 rounded-lg my-3">
            <Link to={"/"}>
              <h1 className="font-bold">View Site</h1>
            </Link>{" "}
          </div>
          <div className="wrapper bg-yellow-200 p-3 rounded-lg my-3">
            <Link to={"/"}>
              <h1 className="font-bold">Log out</h1>
            </Link>{" "}
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
