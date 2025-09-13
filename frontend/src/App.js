// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import LandingPage from "./screens/landingPage";
import TaxCalculator from "./screens/taxCalculator";
import UserList from "./screens/userList";
import GroupList from "./screens/groupList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tax" element={<TaxCalculator />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/groups" element={<GroupList />} />
      </Routes>
    </Router>
  );
}

export default App;
