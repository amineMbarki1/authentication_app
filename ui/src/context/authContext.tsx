import { createContext, FC, useEffect, useReducer, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import tokenService from "../service/token.service";

type Props = {
  children: React.ReactNode;
};

type AuthState = {
  isLoggedin: boolean;
  refresh_token: string | null;
  access_token: string | null;
};

export enum AuthActions {
  LOGIN = "login",
  LOGOUT = "logout",
  INITIAL = "initial",
}

type AuthAction = {
  type: AuthActions;
  payload?: AuthState;
};

const initialState: AuthState = {
  isLoggedin: false,
  refresh_token: null,
  access_token: null,
};

export const reducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        isLoggedin: true,
        access_token: action.payload!.access_token,
        refresh_token: action.payload!.refresh_token,
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        refresh_token: null,
        access_token: null,
        isLoggedin: false,
      };

    default:
      return state;
  }
};

// TODO : Add typing to the context
export const AuthContext = createContext<
  [AuthState, Dispatch<AuthAction>] | []
>([]);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [authState, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to main page when user logs in
    if (authState.isLoggedin) {
      toast.success("Loggedin success!");
      navigate("/");
    }
    // Clear tokens saved in storage when user logout
    if (authState.isLoggedin === false) {
      tokenService.deleteTokensFromStorage();
    }

    console.log("Auth state updated!!! :", authState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isLoggedin]);

  useEffect(() => {
    //Login user when tokens are present in localStorage
    const tokens = tokenService.getTokensFromStorage();
    if (!tokens) return;
    dispatch({
      type: AuthActions.LOGIN,
      payload: {
        isLoggedin: true,
        ...tokens,
      },
    });
  }, []);

  return (
    <AuthContext.Provider value={[authState, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
