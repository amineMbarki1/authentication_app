import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import useStore from "./store";
import LoginPage from "./auth/pages/LoginPage";
import RegisterPage from "./auth/pages/RegisterPage";
import ProfilePage from "./user/pages/ProfilePage";
import PrivateRoute from "./shared/components/PrivateRoute";

import "./App.css";

function App() {
  const store = useStore();

  useEffect(() => {
    // TODO: Export logic to own function
    // 1-Get Tokens from localstorage
    const tokens = localStorage.getItem("tokens");
    // 2-Authenticate user if tokens exist
    if (tokens) {
      store.setIsAuthenticated(true);
    } else {
      store.setIsAuthenticated(false);
    }

    store.setInitialRequestLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routes = (
    <Routes>
      {/* ==== Public Routes ==== */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* ======== */}
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<ProfilePage />} />
      </Route>
    </Routes>
  );

  return (
    <>
      <Toaster position="bottom-center" />

      <div className="App">
        <br />
        <br />
        {!store.initialRequestLoading && routes}
      </div>
    </>
  );
}

export default App;
