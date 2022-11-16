import React from "react";
import { useDispatch } from "react-redux";
import { setWasInitAuthAttempt, tokenLogin } from "@redux/slices/auth";

import { AppDispatch } from "@redux/store";
import useAppSelector from "@hooks/useAppSelector";
import LocalStorageService from "@services/LocalStorageService";

const useInitLoginAttempt = () => {
  const dispatch = useDispatch<AppDispatch>();

  const wasInitLoginAttempt = useAppSelector(state => state.auth.wasInitLoginAttempt);
  const isLogging = useAppSelector(state => state.auth.isLogging);

  React.useEffect(() => {
    if (!wasInitLoginAttempt && !isLogging) {
      const token = LocalStorageService.getToken();
      if (token) {
        dispatch(tokenLogin());
      }
      else {
        dispatch(setWasInitAuthAttempt(true));
      }
    }
  }, [dispatch, wasInitLoginAttempt, isLogging]);
}

export default useInitLoginAttempt;