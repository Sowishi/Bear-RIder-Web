import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing";
import AboutPage from "./pages/about";
import Login from "./pages/login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
