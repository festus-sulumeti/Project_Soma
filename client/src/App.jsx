import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginParent from "./pages/LoginParent";
import Dashboard from "./pages/Dashboard";
import ProtectedWrapper from "./components/ProtectedWrapper";

function App() {
  return (
    <main className="pb-10">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginparent" element={<LoginParent />} />
       
        <Route element={<ProtectedWrapper/>}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
