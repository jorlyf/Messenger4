import * as React from "react";
import { getUserDataUrl } from "@helpers/index";
import DefaultAvatar from "@public/DefaultAvatar.jpg";

import styles from "./DialogListItem.module.css";

export interface IDialogItem {
  id: string;
  name: string;
  isCurrentDialog: boolean;
  onClick?: () => void;
  lastMessageText: string;
  isLastMessageMy: boolean;
  unreadedMessageCount?: number;
  avatarUrl: string | null;
  lastUpdatedTimestamp: number;
}

export interface DialogListItemProps {
  data: IDialogItem;
}

const DialogListItem: React.FC<DialogListItemProps> = ({ data }) => {
  const getLastMessageText = (): string => {
    if (!data.lastMessageText) return "";

    if (data.lastMessageText.length > 15) {
      return data.lastMessageText.slice(0, 15) + "...";
    }
    return data.lastMessageText;
  }

  const getName = (): string => {
    if (data.name.length > 14) {
      return data.name.slice(0, 14) + "...";
    }
    return data.name;
  }

  const getTime = (): string => {
    const now = new Date();
    const dialogLastUpdate = new Date(data.lastUpdatedTimestamp);
    if (now.toDateString() === dialogLastUpdate.toDateString()) {
      return dialogLastUpdate.toLocaleString("ru", { hour: "2-digit", minute: "2-digit" });;
    }

    return dialogLastUpdate.toLocaleString("ru", { year: "numeric", month: "2-digit", day: "2-digit" });
  }

  return (
    <div className={`${styles.dialog} ${data.isCurrentDialog && styles.current}`}>
      <div className={styles.avatarContainer}>
        {data.avatarUrl ?
          <img src={getUserDataUrl(data.avatarUrl)} className={styles.avatar} />
          :
          <img src={DefaultAvatar} className={styles.avatar} />
        }
      </div>
      <div onClick={data.onClick} className={styles.container}>
        <span className={styles.name}>{getName()}</span>
        <div className={styles.lastMessageContainer}>
          <span className={styles.lastMessageText}>{data.isLastMessageMy && "Вы: "}{getLastMessageText()}</span>
          <span className={styles.time}>{getTime()}</span>
        </div>
      </div>
    </div>
  )
}

export default DialogListItem;