"use client";

import { Button, Navbar } from "flowbite-react";
import logo from "../assets/LOGO 1 (1).png";

export function Header() {
  return (
    <Navbar fluid rounded className="lg:mx-20 lg:my-3">
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          src={logo}
          className="mr-3 h-9 sm:h-9 lg:h-14"
          alt="Flowbite React Logo"
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button className="mr-3" color={"failure"}>
          Become a rider
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse theme={"failure"}>
        <Navbar.Link
          className="hover:bg-red-500 hover:text-white text-lg"
          href="#"
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          className="hover:bg-red-500 hover:text-white text-lg"
          href="#"
        >
          About Us
        </Navbar.Link>
        <Navbar.Link
          className="hover:bg-red-500 hover:text-white text-lg"
          href="#"
        >
          Contact Us
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
