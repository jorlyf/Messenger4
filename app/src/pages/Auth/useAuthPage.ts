import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import useAppSelector from "@hooks/useAppSelector";
import { LoginData, RegistrationData } from "@entities/auth";
import { login, register } from "@redux/slices/auth";
import { AppDispatch } from "@redux/store";

export enum Mode {
  login,
  registrate
}

const useAuthPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [mode, setMode] = React.useState<Mode>(Mode.login);

  const [loginInput, setLoginInput] = React.useState<string>("");
  const [passwordInput, setPasswordInput] = React.useState<string>("");

  const isLogging = useAppSelector(state => state.auth.isLogging);
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);
  const wasInitLoginAttempt = useAppSelector(state => state.auth.wasInitLoginAttempt);

  const clearInputs = () => {
    setLoginInput("");
    setPasswordInput("");
  }

  const handleChangeMode = (newMode: Mode) => {
    setMode(newMode);
  }

  const handleSubmitLogin = () => {
    const loginData: LoginData = { login: loginInput, password: passwordInput }
    dispatch(login(loginData));
    
  }

  const handleSubmitRegister = async () => {
    const registrationData: RegistrationData = { login: loginInput, password: passwordInput }
    dispatch(register(registrationData));
  }

  React.useEffect(() => {
    if (isAuthorized) { navigate("/"); }
  }, [isAuthorized, navigate]);

  return {
    mode,
    wasInitLoginAttempt,
    isAuthorized,
    isLogging,
    loginInput,
    setLoginInput,
    passwordInput,
    setPasswordInput,
    handleChangeMode,
    handleSubmitLogin,
    handleSubmitRegister
  }
}

export default useAuthPage;