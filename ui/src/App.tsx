import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginPage from "./auth/pages/LoginPage";
import RegisterPage from "./auth/pages/RegisterPage";

function App() {
  return (
    <div className="App">
      <br />
      <br />
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
