import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Create from "./pages/Create";
import { useState } from "react";
import BlogList from "./pages/BlogList";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<BlogList isAuth={isAuth} />} />
          <Route
            path="/login"
            element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route path="/create" element={<Create />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
