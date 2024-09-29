// app/chat/[id]/page.js
// app/chat/[id]/page.js
"use client"; // Make sure this is the first line
import { useState, useEffect } from 'react';
import styles from '/styles/Chat.module.css'; // Importing the styles
import { useRouter } from 'next/router';

export default function Chat() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [groupId, setGroupId] = useState(null);

  useEffect(() => {
    // Wait for the router to be ready
    if (router.isReady) {
      const { id } = router.query; // Get the group ID from the URL
      setGroupId(id);
    }
  }, [router.isReady, router.query]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      
      // Simulating receiving a message after a delay
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'This is a simulated response!', sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h1>Chat Room for Group ID: {groupId || 'Loading...'}</h1>
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
