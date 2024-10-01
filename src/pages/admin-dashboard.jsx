import AdminLayout from "../layout/admin";
import LineChart from "../components/chart";
import { Badge, Card, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import moment from "moment";
import PieChart from "../components/pie";
import { FaMotorcycle, FaUser, FaUsers } from "react-icons/fa";
import useCrudUsers from "../hooks/useCrudUsers";

const AdminDashboard = () => {
  const [currentFormat, setCurrentFormat] = useState("daily");

  const { data } = useCrudUsers();
  const rider = data.filter((item) => {
    if (item.role == "Rider") {
      return item;
    }
  });
  const user = data.filter((item) => {
    if (item.role !== "Rider") {
      return item;
    }
  });
  return (
    <AdminLayout>
      <div className="container mx-auto mt-20">
        {/* <div className="date text-center font-bold text-4xl text-red-500">
          Date: {moment(currentDate).format("LL")}
        </div> */}
        <h1 className="font-bold text-3xl mb-10">Admin Dashboard</h1>

        <div className="cards flex my-10">
          <div className="basis-4/12 flex items-center justify-center">
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center ">
                Total Rider Count <FaMotorcycle className="ml-3" />{" "}
                <Badge className="ml-3" size={"2xl"}>
                  {rider.length}
                </Badge>
              </h5>

              <p className="font-normal text-gray-700 dark:text-gray-400">
                The entire number of riders who have signed up for Bear Rider
                Express
              </p>
            </Card>
          </div>
          <div className="basis-4/12 flex items-center justify-center">
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center ">
                Total Customer Count <FaUser className="ml-3" />{" "}
                <Badge className="ml-3" size={"2xl"}>
                  {user.length}
                </Badge>
              </h5>

              <p className="font-normal text-gray-700 dark:text-gray-400">
                The entire number of customer who have using Bear Rider Express
              </p>
            </Card>
          </div>
          <div className="basis-4/12 flex items-center justify-center">
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center ">
                Total Users Count <FaUsers className="ml-3" />{" "}
                <Badge className="ml-3" size={"2xl"}>
                  {data.length}
                </Badge>
              </h5>

              <p className="font-normal text-gray-700 dark:text-gray-400">
                The entire number of users of Bear Rider Express
              </p>
            </Card>
          </div>
        </div>
        <div className="wrapper flex justify-end items-center">
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
