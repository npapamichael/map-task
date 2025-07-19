import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import ProductAverage from "./ProductAvg";
import ContinentAverage from "./ContinentAvg";

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Sales Dashboard</h1>
        <nav className="app-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/product-average" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Avg by Product</NavLink>
          <NavLink to="/continent-average" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Avg by Continent</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-average" element={<ProductAverage />} />
          <Route path="/continent-average" element={<ContinentAverage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
