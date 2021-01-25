import React, {useEffect, useRef, useState, useCallback} from 'react'
import Pusher from 'pusher-js'
import axios from "axios";

import './App.css';
import config from './config.json'

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : config.API_URL

function App() {

  const channel = useRef(null);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('')

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

  const handleKeydown = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      axios.post(`${baseUrl}/pusher/send`, {
        channel: config.APP_CHANNEL,
        message: text
      })
      setText("");
    }
  }, [text]);

  const handleChange = useCallback((e) => {
    setText(e.target.value)
  }, [])

  return (
    <div className="App">
      <div data-testid='messages'>
        {
          messages.map((message) => (
              <div key={message.id} data-testid='message'>
                {
                  message.message
                }
              </div>
          ))
        }
      </div>

      <div>
        <textarea onKeyDown={handleKeydown} value={text} onChange={handleChange} />
      </div>
    </div>
  );
}

export default App;
