import React, { useContext } from 'react';
import ChatMessage from './ChatMessage';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useFetchRecipientUser } from '../hooks/useFetchRecipientUser';

const ChatWindow = () => {
   const { user, userLoading } = useContext(AuthContext);
   const { isMessagesLoading, messages, currentChat } = useContext(ChatContext);
   const { recipientUser } = useFetchRecipientUser(user, currentChat);

   // if (!recipientUser) {
   //    return <span>ASDPNASDKOASDNASKDNOASDNOKASDIONASDONASDNASNOk</span>;
   // }

   if (isMessagesLoading || userLoading) {
      return console.log('loading chats...');
   }

   console.log('Messages of current chat: ', messages);

   return (
      <div className="flex-1 p-4 overflow-y-auto w-[100%]">
         {messages?.map((msg, index) => (
            <ChatMessage
               key={msg._id}
               sender={msg.senderId}
               message={msg.text}
               time={msg.createdAt}
            />
         ))}
      </div>
   );
};

export default ChatWindow;
