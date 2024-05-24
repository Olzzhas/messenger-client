// components/ChatWindow.js
import React from 'react';

const ChatMessage = ({ sender, message, time }) => (
   <div className="mb-4">
      <div
         className={`font-semibold ${
            sender === 'me' ? 'text-right' : 'text-left'
         }`}
      >
         {message}
      </div>
      <div className="text-xs text-gray-400">{time}</div>
   </div>
);

const ChatWindow = ({ messages }) => (
   <div className="flex-1 p-4 overflow-y-auto">
      {messages?.map((msg, index) => (
         <ChatMessage
            key={index}
            sender={msg.sender}
            message={msg.message}
            time={msg.time}
         />
      ))}
   </div>
);

export default ChatWindow;
