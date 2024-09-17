import AdminLayout from "../layout/admin";
import LineChart from "../components/chart";
import { Select, TextInput } from "flowbite-react";
import { useState } from "react";
import moment from "moment";
import PieChart from "../components/pie";

const AdminDashboard = () => {
  const [currentFormat, setCurrentFormat] = useState("daily");

  return (
    <AdminLayout>
      <div className="container mx-auto mt-20">
        <h1 className="text-2xl mb-10">Good Morning, Juan Dela Cruz</h1>

        {/* <div className="date text-center font-bold text-4xl text-red-500">
          Date: {moment(currentDate).format("LL")}
        </div> */}
        <div className="wrapper flex justify-between items-center">
          <h1 className="font-bold text-3xl mb-10">Admin Dashboard</h1>
          <div className="wrapper">
            <h1 className="mb-2 font-bold">Select Data Format</h1>
            <Select onChange={(event) => setCurrentFormat(event.target.value)}>
              <option value={"daily"}>Daily</option>

              <option value={"monthly"}>Monthly</option>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="basis-6/12">
            <h1 className="font-bold text-2xl text-center">
              Rider Total Sales
            </h1>
            <LineChart currentFormat={currentFormat} />
          </div>
          <div
            className="basis-6/12 flex items-center justify-center"
            style={{ maxHeight: 500 }}
          >
            <PieChart />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
