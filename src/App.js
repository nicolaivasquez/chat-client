import React, {useEffect, useRef, useState, useCallback} from 'react'
import Pusher from 'pusher-js'

import './App.css';
import config from './config.json'
import {Header} from './Header';
import {ChatList} from "./ChatList";
import styled from "styled-components";
import {ChatWindow} from "./ChatWindow";

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : config.API_URL

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;

  height: 100%;
`

function App() {

  const channel = useRef(null);

  const [messages, setMessages] = useState([]);

  const receiveMessage = useCallback((message) => {
    setMessages(orig => [...orig, message]);
  }, [])

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher(config.APP_KEY, {
      authEndpoint: `${baseUrl}/pusher/auth`,
      cluster: 'eu',
      encrypted: true,
    });

    if (channel.current === null) {
      channel.current = pusher.subscribe(config.APP_CHANNEL);
      channel.current.bind('message', function(data) {
        receiveMessage(data)
      });
    }
  }, [receiveMessage]);

  return (
    <div className="App">
      <Header />
      <MainWrapper>
        <ChatList />
        <ChatWindow messages={messages} />
      </MainWrapper>

    </div>
  );
}

export default App;
