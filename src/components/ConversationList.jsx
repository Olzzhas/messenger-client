import React, { useContext } from 'react';
import ConversationItem from './ConversationItem';
import { ChatContext } from '../context/ChatContext';

const ConversationsList = ({ conversations, onSelectConversation }) => {
   const {
      userChats,
      isUserChatsLoading,
      messages,
      isMessagesLoading,
      updateCurrentChat,
      currentChat,
   } = useContext(ChatContext);

   if (isUserChatsLoading || isMessagesLoading) {
      return console.log('loading chats...');
   }

   // console.log(userChats);
   console.log(currentChat);

   return (
      <div className="w-[400px] border-r border-gray-200 overflow-y-auto">
         {userChats.map((convo) => (
            <>
               <ConversationItem
                  key={convo.id}
                  name={convo.name}
                  message={messages[0]}
                  time={convo.time}
                  active={convo.active}
                  onClick={() => {
                     onSelectConversation(convo.id);
                     updateCurrentChat(convo);
                  }}
               />
            </>
         ))}
      </div>
   );
};

export default ConversationsList;
