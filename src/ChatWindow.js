import React from "react";
import {
  ChatInput,
  ChatInputWrapper,
  ChatSend,
  WindowWrapper,
} from "./components/ChatWindow";
import config from './config.json'
import axios from "axios";
import {ChatMessages} from "./ChatMessages";

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : config.API_URL

export const ChatWindow = ({
    messages,
                           }) => {
  const [inputText, setInputText] = React.useState("");
  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        setInputText("");
        axios.post(`${baseUrl}/pusher/send`, {
          channel: config.APP_CHANNEL,
          message: inputText
        })
      }
    },
    [inputText]
  );
  const handleSend = React.useCallback(() => {
    setInputText("");
    axios.post(`${baseUrl}/pusher/send`, {
      channel: config.APP_CHANNEL,
      message: inputText
    })
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
        />
        <ChatSend disabled={inputText.length === 0} onClick={handleSend}>
          Send
        </ChatSend>
      </ChatInputWrapper>
    </WindowWrapper>
  );
};
