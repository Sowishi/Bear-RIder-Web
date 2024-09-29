import {
  HiAdjustments,
  HiCloudDownload,
  HiOutlineMenuAlt2,
  HiUserCircle,
} from "react-icons/hi";
import { BearDrawer } from "../components/bearDrawer";
import { useState } from "react";
import logo from "../assets/LOGO 1 (1).png";
import { FooterComponent } from "../components/footer";
import { Button } from "flowbite-react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";
import { FaPesoSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const navigation = useNavigate();

  return (
    <>
      <div className="w-full pb-20 ">
        <BearDrawer open={open} handleClose={() => setOpen(false)} />
        <div
          className="header p-7 flex items-center justify-between"
          style={{ background: "#F4CB52" }}
        >
          <HiOutlineMenuAlt2
            onClick={() => setOpen(true)}
            color="black"
            size={30}
          />
          <div className="wrapper">
            <h1 className="font-bold text-2xl">Admin Dashboard</h1>
          </div>
        </div>
        <div className="flex justify-center items-center pt-10">
          <Button.Group>
            <Button
              onClick={() => {
                navigation("/admin-dashboard");
              }}
              color="gray"
            >
              <MdSpaceDashboard className="mr-3 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              onClick={() => {
                navigation("/admin-user");
              }}
              color="gray"
            >
              <FaUsers className="mr-3 h-4 w-4" />
              User Management
            </Button>
            <Button
              onClick={() => {
                navigation("/admin-rider");
              }}
              color="gray"
            >
              <FaMotorcycle className="mr-3 h-4 w-4" />
              Rider Management
            </Button>
            <Button
              onClick={() => {
                navigation("/admin-transaction");
              }}
              color="gray"
            >
              <FaPesoSign className="mr-3 h-4 w-4" />
              Transactions
            </Button>
          </Button.Group>
        </div>

        {children}
      </div>
      <FooterComponent hide={true} />
    </>
  );
};

export default AdminLayout;
