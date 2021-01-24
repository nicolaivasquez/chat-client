import React, {useEffect, useRef, useState, useCallback} from 'react'
import Pusher from 'pusher-js'
import axios from "axios";

import './App.css';
import config from './config.json'

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : config.API_URL

function App() {

  const channel = useRef(null);

  const [messages, setMessages] = useState([])

  const receiveMessage = useCallback((message) => {
    setMessages(orig => [...orig, message]);
  }, [messages])

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher(config.APP_KEY, {
      authEndpoint: 'http://localhost:9000/pusher/auth',
      cluster: 'eu',
      encrypted: true,
    });

    if (channel.current === null) {
      channel.current = pusher.subscribe(config.APP_CHANNEL);
      channel.current.bind('message', function(data) {
        receiveMessage(JSON.stringify(data))
      });
    }
  }, []);

  useEffect(() => {
    if (channel.current) {
      setInterval(() => {
        axios.post('http://localhost:9000/pusher/send', {
          channel: config.APP_CHANNEL,
          message: `Hello, ${Math.random()}`
        })
      }, 5000)
    }
  }, [channel]);

  return (
    <div className="App">
      {
        messages.map((message, index) => (
            <div key={index}>
              {
                message
              }
            </div>
        ))
      }
    </div>
  );
}

export default App;
