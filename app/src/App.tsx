import React from "react";

import useInitLoginAttempt from "@hooks/useInitLoginAttempt";
import useAuthPageRedirect from "@hooks/useAuthPageRedirect";

import LeftColumnHeader from "@components/LeftColumnHeader";
import LeftColumn from "@components/LeftColumn";
import RightColumnHeader from "@components/RightColumnHeader";

import Routing from "./Routing";
import styles from "./App.module.scss";

const App: React.FC = () => {

  useInitLoginAttempt();
  useAuthPageRedirect();

  return (
    <div className={styles.app}>
      <div className={styles.leftColumn}>
        <LeftColumnHeader />
        <LeftColumn />
      </div>

      <div className={styles.rightColumn}>
        <RightColumnHeader />
        <Routing />
      </div>

      {/* <Modals /> */}
    </div>
  );
}

export default App;
