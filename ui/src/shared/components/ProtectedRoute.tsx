import { FC } from "react";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { AuthContext } from "../../context/authContext";

const ProtectedRoute: FC = () => {
  const [authState] = useContext(AuthContext);

  return authState!.isLoggedin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
