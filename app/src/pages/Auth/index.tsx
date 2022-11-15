import * as React from "react";
import InputField from "@components/InputField";
import useAuthPage, { Mode } from "./useAuthPage";

import styles from "./Auth.module.scss";

const AuthPage: React.FC = () => {

  const {
    mode,
    wasInitLoginAttempt,
    isAuthorized,
    loginInput,
    setLoginInput,
    isLogging,
    passwordInput,
    setPasswordInput,
    handleSubmitLogin,
    handleSubmitRegister,
    handleChangeMode
  } = useAuthPage();
  
  return (
    <div>
      <div className={styles.form}>
          <div className={styles.inputs}>
            <InputField
              value={loginInput}
              setValue={setLoginInput}
              placeholder={"Логин"}
              isOneRow={true}
              disabled={isLogging || isAuthorized}
            />
            <InputField
              value={passwordInput}
              setValue={setPasswordInput}
              placeholder={"Пароль"}
              isOneRow={true}
              disabled={isLogging || isAuthorized}
            />
          </div>
          {mode === Mode.login &&
            <>
              <button disabled={isLogging || isAuthorized} onClick={handleSubmitLogin} className={styles.submit}>Войти</button>
              <a onClick={() => handleChangeMode(Mode.registrate)} className={styles.changeMode}>У меня нет аккаунта</a>
            </>
          }
          {mode === Mode.registrate &&
            <>
              <button disabled={isLogging || isAuthorized} onClick={handleSubmitRegister} className={styles.submit}>Зарегистрироваться</button>
              <a onClick={() => handleChangeMode(Mode.login)} className={styles.changeMode}>У меня есть аккаунт</a>
            </>
          }
        </div>
    </div>
  )
}

export default AuthPage;