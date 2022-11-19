import LeftColumnHeaderUserMenuContainer from "@components/LeftColumnHeaderUserMenu";
import React from "react";

import styles from "./index.module.scss";

const LeftColumnHeaderContainer: React.FC = () => {
  return (
    <LeftColumnHeader />
  );
}

const LeftColumnHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <LeftColumnHeaderUserMenuContainer />
      <div className={styles.search}>
        {/* <DialogAndUserSearchContainer
          handleUserItemClick={handleSearchResultUserItemClick}
          clearAfterUserItemClick={true}
        /> */}
      </div>
    </header>
  );
}

export default LeftColumnHeaderContainer;