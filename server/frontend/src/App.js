import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Dealers from "./components/Dealers/Dealers";
import DealerDetails from "./components/DealerDetails/DealerDetails";
import AddReview from "./components/AddReview/AddReview";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dealers />} />
        <Route path="/dealer/:id" element={<DealerDetails />} />
        <Route path="/add-review/:dealerId" element={<AddReview />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
