import React from "react";
import { useDispatch } from "react-redux";

import { setWasInitAuthAttempt } from "@redux/slices/auth";
import useAppSelector from "@hooks/useAppSelector";
import LocalStorageService from "@services/LocalStorageService";
import LoginService from "@services/LoginService";

const useInitLoginAttempt = () => {
  const dispatch = useDispatch();

  const wasInitLoginAttempt = useAppSelector(state => state.auth.wasInitLoginAttempt);
  const isLogging = useAppSelector(state => state.auth.isLogging);

  React.useEffect(() => {
    if (!wasInitLoginAttempt && !isLogging) {
      const token = LocalStorageService.getToken();
      if (token) {
        LoginService.tokenLogin();
      }
      else {
        dispatch(setWasInitAuthAttempt(true));
      }
    }
  }, [dispatch, wasInitLoginAttempt, isLogging]);
}

export default useInitLoginAttempt;