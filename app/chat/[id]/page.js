"use client"; // Ensures the component runs on the client side

import { useState, useEffect } from 'react';
import io from 'socket.io-client'; // Import socket.io-client
import styles from '/styles/Chat.module.css';
import { useParams } from 'next/navigation'; // Import useParams for dynamic routing

let socket; // Global socket variable

export default function Chat() {
  const { id } = useParams(); // Extract the dynamic id from the URL
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Initialize socket connection
    socket = io({ path: '/api/socket' }); // Specify the path for Socket.IO

    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('receiveMessage');
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const message = { text: input, sender: 'user', groupId: id };
      setMessages([...messages, message]);
      socket.emit('sendMessage', message); // Emit the message to the server
      setInput('');
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h1>Chat Room for Group ID: {id || 'Loading...'}</h1>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button type="submit" className={styles.sendButton}>Send</button>
      </form>
    </div>
  );
}
