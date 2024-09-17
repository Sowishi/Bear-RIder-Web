import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { BearDrawer } from "../components/bearDrawer";
import { useState } from "react";
import logo from "../assets/LOGO 1 (1).png";
import { FooterComponent } from "../components/footer";

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

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

        {children}
      </div>
      <FooterComponent hide={true} />
    </>
  );
};

export default AdminLayout;
