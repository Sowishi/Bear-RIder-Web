import { useState, useEffect } from "react";
import { RiderTable } from "../components/riderTable";
import AdminLayout from "../layout/admin";
import { TextInput, Button, Label } from "flowbite-react";
import useCrudFare from "../hooks/useCrudFare";

const AdminFare = () => {
  const { data, updateFare } = useCrudFare();

  const [baseFare, setBaseFare] = useState(0); // Default to 0 initially
  const [chargePerKm, setChargePerKm] = useState(0);

  // Update state when `data` is fetched
  useEffect(() => {
    if (data) {
      setBaseFare(data.baseFareValue || "Loading...");
      setChargePerKm(data.chargePerKmValue || "Loading...");
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

    updateFare({ baseFareValue, chargePerKmValue }); // Call the update API
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
          <h2 className="font-bold text-2xl mb-6">Fare Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Base Fare Input */}
            <div>
              <Label htmlFor="baseFare" className="block mb-2">
                Base Fare
              </Label>
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
            </div>

            {/* Charge per Kilometer Input */}
            <div>
              <Label htmlFor="chargePerKm" className="block mb-2">
                Charge Per Kilometer
              </Label>
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
            </div>
          </div>
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
