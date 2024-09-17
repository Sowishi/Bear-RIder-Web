import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing";
import AboutPage from "./pages/about";
import Login from "./pages/login";
import AdminUser from "./pages/admin-user";
import AdminRider from "./pages/admin-rider";
import AdminTransaction from "./pages/admin-transcation";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-user" element={<AdminUser />} />
      <Route path="/admin-rider" element={<AdminRider />} />
      <Route path="/admin-transaction" element={<AdminTransaction />} />
    </Routes>
  );
};

export default App;
