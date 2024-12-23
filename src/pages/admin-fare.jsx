import { useState, useEffect } from "react";
import AdminLayout from "../layout/admin";
import { TextInput, Button, Label } from "flowbite-react";
import useCrudFare from "../hooks/useCrudFare";

const AdminFare = () => {
  const { data, updateFare, updateInspection, getInspection } = useCrudFare();
  const [inspectionData, setInspectionData] = useState();

  const [baseFare, setBaseFare] = useState(0); // Default to 0 initially
  const [chargePerKm, setChargePerKm] = useState(0);
  const [percentage, setPercentage] = useState(0); // New state for percentage input

  // Update state when `data` is fetched
  useEffect(() => {
    getInspection(setInspectionData);

    if (data) {
      setBaseFare(data.baseFareValue || "Loading...");
      setChargePerKm(data.chargePerKmValue || "Loading...");
    }
    if (inspectionData) {
      setPercentage(inspectionData?.value);
    }
  }, [data]);

  const handleInputChange = (setter) => (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      // Allow only numeric input
      setter(value);
    }
  };

  const handleUpdateFare = () => {
    const baseFareValue = parseFloat(baseFare) || 0;
    const chargePerKmValue = parseFloat(chargePerKm) || 0;
    const percentageValue = parseFloat(percentage) || 0;

    updateFare({ baseFareValue, chargePerKmValue });
    updateInspection(percentageValue);
    alert("Fare details updated successfully!");
  };

  return (
    <AdminLayout>
      <div className="container mx-auto mt-20">
        {/* Header Section */}
        <div className="header flex justify-between items-center mb-10">
          <h1 className="font-bold text-3xl">Fare Management</h1>
        </div>

        {/* Fare Management Section */}
        <div className="fare-management bg-white rounded-lg shadow-lg p-6 mb-10">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-4 text-left">Field</th>
                <th className="border border-gray-300 p-4 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {/* Base Fare Input */}
              <tr>
                <td className="border border-gray-300 p-4">Base Fare</td>
                <td className="border border-gray-300 p-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-lg font-semibold">₱</span>
                    <TextInput
                      id="baseFare"
                      type="text"
                      value={baseFare}
                      onChange={handleInputChange(setBaseFare)}
                      placeholder="Enter base fare"
                    />
                  </div>
                </td>
              </tr>

              {/* Charge per Kilometer Input */}
              <tr>
                <td className="border border-gray-300 p-4">
                  Charge Per Kilometer
                </td>
                <td className="border border-gray-300 p-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-lg font-semibold">₱</span>
                    <TextInput
                      id="chargePerKm"
                      type="text"
                      value={chargePerKm}
                      onChange={handleInputChange(setChargePerKm)}
                      placeholder="Enter charge per kilometer"
                    />
                  </div>
                </td>
              </tr>

              {/* Percentage Input */}
              <tr>
                <td className="border border-gray-300 p-4">Percentage Value</td>
                <td className="border border-gray-300 p-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-lg font-semibold">%</span>
                    <TextInput
                      id="percentage"
                      type="text"
                      value={percentage}
                      onChange={handleInputChange(setPercentage)}
                      placeholder="Enter percentage value"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-6 text-right">
            <Button
              onClick={handleUpdateFare}
              className="bg-blue-500 text-white"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminFare;
