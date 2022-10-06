import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginPage from "./auth/pages/LoginPage";
import RegisterPage from "./auth/pages/RegisterPage";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import ProfilePage from "./user/pages/ProfilePage";

import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <AuthProvider>
        <div className="App">
          <br />
          <br />
          <Routes>
            {/* ==== Public Routes ==== */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* ==== ==== */}

            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<ProfilePage />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
