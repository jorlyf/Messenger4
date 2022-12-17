import * as React from "react";
import useAppSelector from "@hooks/useAppSelector";
import MessageListItem from "@components/MessageListItem";
import { Message } from "@entities/local";

import styles from "./index.module.scss";

interface MessageListContainerProps {
  items: Message[];
}

const MessageListContainer: React.FC<MessageListContainerProps> = ({
  items,
}) => {

  const handleScroll = () => { }

  return (
    <MessageList
      items={items}
      onScroll={handleScroll}
    />
  )
}

interface MessageListProps {
  items: Message[];
  onScroll: () => void;
}

const MessageList: React.FC<MessageListProps> = ({
  items,
  onScroll
}) => {
  return (
    <div onScroll={onScroll} className={styles.listContainer}>
      {/* {items.map(message => (
        <MessageListItem
          key={message.id}
          senderUser={ }
          message={message}
        />
      ))} */}
      <div /> {/* к этому блоку скроллить в конец */}
    </div>
  )
}

export default MessageListContainer;