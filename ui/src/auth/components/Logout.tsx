import React, { FC } from "react";
import tokenService from "../../service/token.service";

import useStore from "../../store";

const Logout: FC = () => {
  const { logout } = useStore();
  const logoutUser = () => {
    tokenService.clearSavedTokens();
    logout();
  };
  return <button onClick={logoutUser}>Logout</button>;
};

export default Logout;
