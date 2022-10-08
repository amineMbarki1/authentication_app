import { FC } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import useStore from "../../store";

const PrivateRoute: FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useStore();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};

export default PrivateRoute;
