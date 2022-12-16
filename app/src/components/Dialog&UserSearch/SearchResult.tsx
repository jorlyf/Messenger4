import React from "react";
import { Dialog, User } from "@entities/local";
import useOutsideClick from "@hooks/useOutsideClick";
import { getUserDataUrl } from "@helpers/index";

import defaultAvatar from "@public/images/defaultAvatar.jpg";
import styles from "./index.module.scss";

export interface SearchResultItems {
  users: User[];
  groupDialogs: Dialog[];
}

interface SearchResultProps {
  items: SearchResultItems;
  handleUserItemClick: (userId: number) => void;
  handleGroupDialogItemClick: (groupId: number) => void;
  handleOutsideClick: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  items,
  handleUserItemClick,
  handleGroupDialogItemClick,
  handleOutsideClick,
}) => {

  const listRef = React.useRef(null);

  if (handleOutsideClick) {
    useOutsideClick(handleOutsideClick, listRef);
  }

  return (
    <div ref={listRef} className={styles.list}>
      <span className={styles.listHeader}>Найденные пользователи:</span>
      {items.users.map(user => (
        <div key={user.id} onClick={() => handleUserItemClick(user.id)} className={styles.item}>
          <div className={styles.avatarContainer}>
            {user.avatarUrl ?
              <img src={getUserDataUrl(user.avatarUrl)} className={styles.avatar} alt="avatar" />
              :
              <img src={defaultAvatar} className={styles.avatar} alt="avatar" />
            }
          </div>
          <span className={styles.login}>{user.login}</span>
        </div>
      ))}
    </div>
  )
}

export default SearchResult;