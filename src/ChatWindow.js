import React from "react";
import {
  ChatInput,
  ChatInputWrapper,
  ChatSend,
  WindowWrapper,
} from "./components/ChatWindow";
import {ChatMessages} from "./ChatMessages";
import {sendMessage} from "./api";

export const ChatWindow = ({
    messages,
                           }) => {
  const [inputText, setInputText] = React.useState("");
  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        setInputText("");
        sendMessage({message: inputText})
      }
    },
    [inputText]
  );
  const handleSend = React.useCallback(() => {
    setInputText("");
    sendMessage({message: inputText})
  }, [ inputText]);
  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  return (
    <WindowWrapper>
      <ChatMessages messages={messages} />
      <ChatInputWrapper>
        <ChatInput
            type="text"
            placeholder="Type your message"
            name="message"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={inputText}
            rows={1}
            data-testid='chat-new-message'
        />
        <ChatSend disabled={inputText.length === 0} onClick={handleSend} data-testid='chat-send-message'>
          Send
        </ChatSend>
      </ChatInputWrapper>
    </WindowWrapper>
  );
};
