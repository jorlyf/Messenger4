import React from "react";

import LeftColumnHeader from "@components/LeftColumnHeader";

import styles from "./App.module.scss";

const App: React.FC = () => {



  return (
    <div className={styles.app}>
      <div className={styles.leftColumn}>
        <LeftColumnHeader />
        {/* {wasInitAuthAttempt &&
          <>
            <DialogListContainer />
            <CreateGroupDialogButtonContainer />
          </>
        } */}
      </div>

      <div className={styles.rightColumn}>
        {/* <RightColumnHeaderContainer />
        {wasInitAuthAttempt &&
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Chat />} path="/:chatId" />
            <Route element={<Auth />} path="/auth" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<NotFound />} path="*" />
          </Routes>} */}
      </div>

      {/* <Modals /> */}
    </div>
  );
}

export default App;
