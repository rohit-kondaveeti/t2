import React, { useState, useEffect } from "react";
import Habits from "./Habits";
import Home from "./Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/habit/:id" element={<Habits />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
