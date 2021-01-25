import styled from "styled-components";

export const WindowWrapper = styled.main`
  display: flex;

  flex-direction: column;
  width: 100%;
  padding: 24px;
`;
export const ChatInputWrapper = styled.div`
  display: flex;
  flex: 0 1 52px;
`;
export const ChatInput = styled.textarea`
  &::-webkit-resizer {
    display: none;
  }

  flex: 1;
  display: flex;
  align-items: center;

  outline: none;
  border: none;
  background: #f6faff;
  font-style: italic;
  font-size: 16px;
  line-height: 20px;
  padding: 16px 24px;
`;
export const ChatSend = styled.button`
  flex: 0 1 108px;

  font-family:  "Helvetica", sans-serif;
  border: none;
  background: #1170e4;
  color: white;
`;
