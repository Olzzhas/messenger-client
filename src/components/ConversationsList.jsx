import React, { useContext } from 'react';
import ConversationItem from './ConversationItem';
import { ChatContext } from '../context/ChatContext';

export const ConversationsList = ({
   onSelectConversation,
   userChats,
   allMessages,
   user,
}) => {
   const { updateCurrentChat } = useContext(ChatContext);

   const getLastMessage = (chatId) => {
      const filteredMessages = allMessages.filter(
         (message) => message.chatId === chatId,
      );
      if (filteredMessages.length > 0) {
         return filteredMessages[filteredMessages.length - 1].text;
      } else {
         return '';
      }
   };

   const getInterlocutor = (members) => {
      return members.find((member) => member !== user.user.id);
   };

   return (
      <div className="w-[400px] h-[1000px] bg-[#e5e5e5] border-r border-l border-gray-200 overflow-y-auto relative">
         <div className="absolute right-0 top-0 h-full w-5 shadow-[-5px_0_5px_-5px_rgba(0,0,0,0.2)]"></div>
         {userChats.map((convo) => {
            const lastMessage = getLastMessage(convo._id);

            const interlocutorId = getInterlocutor(convo.members);

            return (
               <ConversationItem
                  user={user}
                  key={convo.id}
                  interlocutorId={interlocutorId}
                  name={convo.name}
                  message={lastMessage}
                  time={convo.time}
                  active={convo.active}
                  onClick={() => {
                     onSelectConversation(convo.id);
                     updateCurrentChat(convo);
                  }}
               />
            );
         })}
      </div>
   );
};
