import React, { useContext } from 'react';
import ConversationItem from './ConversationItem';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';

const ConversationsList = ({ conversations, onSelectConversation }) => {
   const { user, userLoading } = useContext(AuthContext);

   const {
      userChats,
      isUserChatsLoading,
      messages,
      isMessagesLoading,
      updateCurrentChat,
      currentChat,
      allMessages,
      IsAllMessagesLoading,
   } = useContext(ChatContext);

   if (
      isUserChatsLoading ||
      isMessagesLoading ||
      IsAllMessagesLoading ||
      userLoading
   ) {
      return console.log('loading chats...');
   }

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
      <div className="w-[400px] border-r border-gray-200 overflow-y-auto">
         {userChats.map((convo) => {
            const lastMessage = getLastMessage(convo._id);

            const interlocutorId = getInterlocutor(convo.members);

            return (
               <ConversationItem
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

export default ConversationsList;
