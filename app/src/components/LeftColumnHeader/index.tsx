import React from "react";
import LeftColumnHeaderUserMenuContainer from "@components/LeftColumnHeaderUserMenu";
import DialogAndUserSearchContainer from "@components/Dialog&UserSearch";

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
        <DialogAndUserSearchContainer
          clearAfterItemClick={true}
        />
      </div>
    </header>
  );
}

export default LeftColumnHeaderContainer;