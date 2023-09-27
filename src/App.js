import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CandidateList from "./components/CandidateList";
import { PaymentPage } from "./components/PaymentPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CandidateList />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
