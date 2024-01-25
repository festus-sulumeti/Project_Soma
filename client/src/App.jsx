import { Route, Routes } from "react-router-dom";
import ProtectedWrapper from "./components/ProtectedWrapper";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Accounts from "./pages/Accounts";
import SchoolPlanning from "./pages/SchoolPlanning";
import Sidebar from "./components/Sidebar";


function App() {
  return (
    <main className="pb-10">
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedWrapper />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts/:account" element={<Accounts />} />
          <Route path="/school/:plan" element={<SchoolPlanning/>}/>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
