import React, { FC, useContext } from "react";

import { AuthActions, AuthContext } from "../../context/authContext";

const Logout: FC = () => {
  const [_, dispatch] = useContext(AuthContext);
  const logout = () => {
    dispatch!({ type: AuthActions.LOGOUT });
    console.log("logged out");
  };
  return <button onClick={logout}>Logout</button>;
};

export default Logout;
