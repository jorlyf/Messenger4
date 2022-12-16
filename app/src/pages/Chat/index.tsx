import * as React from "react";
import { useParams } from "react-router";
import useChatPage from "./useChatPage";

const ChatPage: React.FC = () => {

  const { dialogInfo } = useParams();
  // const { currentDialog, handleSendMessage } = useChatPage(dialogInfo);

  return (
    <div>

    </div>
  )
}

export default ChatPage;