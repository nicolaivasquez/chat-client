import styled from "styled-components";
import React from "react";

export const Sidebar = styled.div`
  display: flex;
  flex: 0 0 347px;
  border-right: 1px solid #77838f;

  flex-direction: column;

  font-family: "Helvetica", sans-serif;
`;
export const Section = styled.div`
  padding-top: 24px;
`;
export const SectionLabel = styled.div`
  height: 52px;
  display: flex;
  align-items: center;
  text-transform: uppercase;

  font-weight: bold;
  padding-left: 47px;
`;
export const Channels = styled.div``;
export const Channel = styled.div`
  cursor: pointer;
  height: 52px;
  display: flex;
  align-items: center;
  padding-left: 47px;
  padding-right: 40px;
  border-bottom: 1px solid #77838f29;

  &:first-of-type {
    border-top: 1px solid #77838f29;
  }

  &:last-of-type {
    margin-bottom: 24px;
  }

  ${(props) =>
    props.active &&
    `
    background-color: #77838F29;
  `};
`;
export const ChannelLabel = styled.div`
  margin-left: 12px;
`;
const UnreadCountWrapper = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: white;
  background: red;
  height: 24px;
  width: 24px;
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;
export const ChannelUnreadCount = ({ count, ...rest }) => {
  const formatted = count > 9 ? "9+" : count.toString();
  return <UnreadCountWrapper {...rest}>{formatted}</UnreadCountWrapper>;
};
