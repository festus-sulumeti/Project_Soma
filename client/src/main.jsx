import { Toaster } from "@/components/ui/sonner";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>
      <App/>
      <Toaster richColors position='top-right'/>
    </BrowserRouter>
  </React.StrictMode>
);
