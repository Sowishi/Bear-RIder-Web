import { Button } from "flowbite-react";
import logo from "../assets/LOGO 1 (1).png";

const Header = () => {
  return (
    <div className="container mx-auto p-3 flex items-center justify-between">
      <img src={logo} alt="" />
      <div className="buttons flex w-[30rem] justify-between items-center">
        <h1 className="font-bold text-lg">Home</h1>
        <h1 className="text-lg">About Us</h1>
        <h1 className="text-lg">Contact Us</h1>
        <Button color={"failure"}>Become a rider</Button>
      </div>
    </div>
  );
};

export default Header;
