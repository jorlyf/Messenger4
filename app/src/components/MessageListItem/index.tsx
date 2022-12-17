import * as React from "react";
import { getUserDataUrl } from "@helpers/index";
import { Message, User } from "@entities/local";
import { MessageSendingStatus } from "@entities/local/Message";
import { AttachmentType } from "@entities/local/Attachment";
import defaultAvatar from "@public/images/DefaultAvatar.jpg";

import styles from "./index.module.scss";

interface MessageListItemProps {
  senderUser: User;
  message: Message;
  isMessageMy: boolean;
}

const MessageListItem: React.FC<MessageListItemProps> = ({
  senderUser,
  message,
  isMessageMy,
}) => {

  const getTime = (): string => {
    const now = new Date();
    const messageSentTime = new Date(message.sentTimestamp);
    if (now.toDateString() === messageSentTime.toDateString()) {
      return messageSentTime.toLocaleString("ru", { hour: "2-digit", minute: "2-digit" });;
    }
    return messageSentTime.toLocaleString("ru", { year: "numeric", month: "2-digit", day: "2-digit" });
  }

  return (
    <div className={styles.container}>
      {isMessageMy ?
        <>
          <div className={styles.item + " " + styles.my}>
            <div className={styles.headAndText}>
              <div className={styles.timeAndLogin}>
                <span className={styles.time + " " + styles.my}>{getTime()}</span>
                <span className={styles.login}>{senderUser.login}</span>
              </div>
              <span className={styles.text + " " + styles.my}>{message.text}</span>
            </div>
            {senderUser.avatarUrl ?
              <img className={styles.avatar} src={getUserDataUrl(senderUser.avatarUrl)} />
              :
              <img className={styles.avatar} src={defaultAvatar} />
            }
            {message.status === MessageSendingStatus.sending &&
              //<IsLoad />
              <></>
            }
            {message.status === MessageSendingStatus.error &&
              <span>ОШИБКА</span>
            }
          </div>
          {message.attachments.length === 1 &&
            <div className={styles.oneAttachment + " " + styles.my}>
              <img key={message.attachments[0].id} className={styles.photoAttachment} src={getUserDataUrl(message.attachments[0].url)} />
            </div>
          }
          {message.attachments.length > 0 && message.attachments.length !== 1 &&
            <div className={styles.attachments + " " + styles.my}>
              {message.attachments.map(x => {
                if (x.type === AttachmentType.photo) {
                  return <img key={x.id} className={styles.photoAttachment} src={getUserDataUrl(x.url)} />
                }
              })}
            </div>
          }
        </>
        :
        <>
          <div className={styles.item}>
            {senderUser.avatarUrl ?
              <img className={styles.avatar} src={getUserDataUrl(senderUser.avatarUrl)} />
              :
              <img className={styles.avatar} src={defaultAvatar} />
            }
            <div className={styles.headAndText}>
              <div className={styles.timeAndLogin}>
                <span className={styles.login}>{senderUser.login}</span>
                <span className={styles.time}>{getTime()}</span>
              </div>
              <span className={styles.text}>{message.text}</span>
            </div>
          </div>

          {message.attachments.length === 1 &&
            <div className={styles.oneAttachment}>
              <img key={message.attachments[0].id} className={styles.photoAttachment} src={getUserDataUrl(message.attachments[0].url)} />
            </div>
          }
          {message.attachments.length > 0 && message.attachments.length !== 1 &&
            <div className={styles.attachments}>
              {message.attachments.map(x => {
                if (x.type === AttachmentType.photo) {
                  return <img key={x.id} className={styles.photoAttachment} src={getUserDataUrl(x.url)} />
                }
              })}
            </div>
          }
        </>
      }
    </div>
  )
}

export default MessageListItem;