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
      <div className={styles.menu}>
        {/* <MenuContainer /> */}
      </div>
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