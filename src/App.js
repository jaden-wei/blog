import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Create from "./pages/BlogEditor";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Auth/Register";
import ResetPassword from "./pages/Auth/ResetPassword";
import BlogPost from "./pages/BlogPost";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/post/:id" element={<BlogPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
