import { format, parseISO } from "date-fns";
import React from "react";
import styled from "styled-components";

export const ChatMessagesWrapper = styled.div`
  flex: 0 1 100%;

  overflow-y: auto;
`;
const ChatTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ChatMessageText = styled.div`
  white-space: pre-line;
  margin-left: 12px;
  padding: 0 24px;
  height: 40px;
  background: #e4e6ec;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;
const ChatMessageMeta = styled.div`
  font-family: "iA Writer Duospace", "Helvetica", sans-serif;
  font-size: 12px;
  color: #77838f;
  margin-top: 12px;
  margin-left: 44px;
`;
const ChatMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;

  ${(props) =>
    props.self &&
    `
    ${ChatTextWrapper}, ${ChatMessageMeta} {
      align-self: flex-end;
    }
    
    ${ChatTextWrapper} {
      flex-direction: row-reverse;
    }
    
    ${ChatMessageMeta} {
      margin-left: 0;
      margin-right: 44px;
    }
    
    ${ChatMessageText} {
      background: #1170E4;
      color: white;
      margin-right: 12px;
      margin-left: 0;
    }
   
  `};
`;
const parseTime = (timestring) =>
  parseISO(timestring);
const StartDateWrapper = styled.div`
  font-family: "Helvetica", sans-serif;
  font-weight: bold;
  font-size: 12px;

  text-align: center;
`;
export const ChatMessagesStartDate = ({ first }) => {
  const firstDate = parseTime(first.createdAt);
  return (
    <StartDateWrapper>{format(firstDate, "eeee h.mm a")}</StartDateWrapper>
  );
};
export const ChatMessage = ({ message }) => {
  const formattedTimestamp = React.useMemo(() => {
    const timestamp = parseTime(message.createdAt);

    return `${format(timestamp, "HH.mm")} on ${format(timestamp, "dd/MM/yy")}`;
  }, [message]);
  return (
    <ChatMessageWrapper self>
      <ChatTextWrapper>
        <ChatMessageText>{message.message}</ChatMessageText>
      </ChatTextWrapper>
      <ChatMessageMeta>Sent at {formattedTimestamp}</ChatMessageMeta>
    </ChatMessageWrapper>
  );
};
