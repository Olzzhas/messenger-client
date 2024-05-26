import React from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ messages }) => (
   <div className="flex-1 p-4 overflow-y-auto w-[100%]">
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
