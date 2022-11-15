import React from "react";
import { useNavigate } from "react-router-dom";

import useAppSelector from "@hooks/useAppSelector";
import { RoutingURL } from "../Routing";

const useAuthPageRedirect = () => {
  const navigate = useNavigate();

  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);

  React.useEffect(() => {
    if (!isAuthorized) {
      navigate(RoutingURL.auth);
    }
  }, [navigate, isAuthorized]);
}

export default useAuthPageRedirect;