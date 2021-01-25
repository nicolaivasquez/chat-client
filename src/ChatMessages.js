import React from "react";
import {
  ChatMessage,
  ChatMessagesStartDate,
  ChatMessagesWrapper,
} from "./components/ChatMessages";


export const ChatMessages = ({messages}) => {
  return (
    <ChatMessagesWrapper>
      {messages.length > 0 && <ChatMessagesStartDate first={messages[0]} />}
      {messages.map((message) => (
          <ChatMessage message={message} key={message.id} />
      ))}
    </ChatMessagesWrapper>
  );
};
