import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing";
import AboutPage from "./pages/about";
import Login from "./pages/login";
import AdminUser from "./pages/admin-user";
import AdminRider from "./pages/admin-rider";
import AdminTransaction from "./pages/admin-transcation";
import AdminDashboard from "./pages/admin-dashboard";
import AdminFare from "./pages/admin-fare";
import ViewUser from "./pages/view-user";
import ViewRider from "./pages/viewRider";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-user" element={<AdminUser />} />
      <Route path="/admin-user/:id" element={<ViewUser />} />

      <Route path="/admin-rider" element={<AdminRider />} />
      <Route path="/admin-rider/:id" element={<ViewRider />} />

      <Route path="/admin-transaction" element={<AdminTransaction />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-fare" element={<AdminFare />} />
    </Routes>
  );
};

export default App;
