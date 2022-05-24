import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Create from "./pages/BlogEditor";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Auth/Register";
import ResetPassword from "./pages/Auth/ResetPassword";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("dashboard");

  const displaySidebar = () => {
    if (page === "dashboard") return <Sidebar setPage={setPage} />;
  };

  return (
    <div className="App">
      <Router>
        {displaySidebar()}
        <div className="right-side-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<Create />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
