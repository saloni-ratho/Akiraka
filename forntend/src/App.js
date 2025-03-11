// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Maintenance from "./pages/Maintenance/Maintenance";

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage Route */}
        <Route path="/" element={<Homepage />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* SignUp Route */}
        <Route path="/signup" element={<SignUp />} />

        {/* Maintenance Route */}
        <Route path="/maintenance" element={<Maintenance />} />

        {/* Fallback Route (404 Page) */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;