import React from "react";
import { useDispatch } from "react-redux";
import useAppSelector from "@hooks/useAppSelector";
import { AppDispatch } from "@redux/store";
import { loadProfile } from "@redux/slices/profile";

const useInitLoadProfile = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);
  const isLoading = useAppSelector(state => state.profile.isLoading);
  const wasInitAttempt = useAppSelector(state => state.profile.wasInitLoadAttempt);

  React.useEffect(() => {
    if (wasInitAttempt || isLoading) return;
    if (!isAuthorized) return;

    dispatch(loadProfile());

  }, [dispatch, isAuthorized, wasInitAttempt]);
}

export default useInitLoadProfile;