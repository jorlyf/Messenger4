import * as React from "react";
import { useParams } from "react-router";
import MessageListContainer from "@components/MessageList";
import ChatInputContainer from "@components/ChatInput";
import { Message } from "@entities/local";
import useChatPage from "./useChatPage";

const ChatPage: React.FC = () => {

  const { dialogInfo } = useParams();
  // const { currentDialog, handleSendMessage } = useChatPage(dialogInfo);

  const messages: Message[] = [];

  return (
    <div>
      <MessageListContainer
        items={messages}
      />
      <ChatInputContainer

      />
    </div>
  )
}

export default ChatPage;