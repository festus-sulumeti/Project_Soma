import { Route, Routes } from "react-router-dom";
import ProtectedWrapper from "./components/ProtectedWrapper";
import Accounts from "./pages/Accounts";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SchoolPlanning from "./pages/SchoolPlanning";
import LoginParent from "./pages/LoginParent";

function App() {
  return (
    <main className="pb-10">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/parents/login" element={<LoginParent />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<ProtectedWrapper />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts/:account" element={<Accounts />} />
          <Route path="/school/:plan" element={<SchoolPlanning />} />
        </Route>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </main>
  );
}

export default App;