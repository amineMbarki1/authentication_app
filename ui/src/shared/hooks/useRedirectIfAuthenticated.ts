import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useStore from "../../store";

const useRedirectIfAuthenticated = () => {
  const store = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(store.isAuthenticated);
    if (store.isAuthenticated) {
      toast("Already logged in");
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useRedirectIfAuthenticated;
