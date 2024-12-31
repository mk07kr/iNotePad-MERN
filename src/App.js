import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import About from "./components/about";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
