import React, { useContext, useEffect, useState } from 'react';
import ConversationItem from './ConversationItem';
import { ChatContext } from '../context/ChatContext';

const ConversationsList = ({
   onSelectConversation,
   userChats,
   allMessages,
   user,
}) => {
   const [searchText, setSearchText] = useState('');

   const {
      updateCurrentChat,
      potentialChats,
      potentialChatsLoading,
      currentChat,
      createChat,
   } = useContext(ChatContext);

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

   const getLastMessageInfo = (chatId) => {
      const filteredMessages = allMessages.filter(
         (message) => message.chatId === chatId,
      );
      if (filteredMessages.length > 0) {
         return {
            message: filteredMessages[filteredMessages.length - 1].text,
            time: filteredMessages[filteredMessages.length - 1].createdAt,
         };
      } else {
         return '';
      }
   };

   const getInterlocutor = (members) => {
      return members.find((member) => member !== user.user.id);
   };

   const handleCreateChat = (interlocutorId) => {
      createChat(user.user.id, interlocutorId);

      setSearchText('');
   };

   if (potentialChatsLoading) {
      return;
   }

   const filteredPotentialChats = potentialChats.filter((chat) =>
      chat.name.toLowerCase().includes(searchText.toLowerCase()),
   );

   const handleChatSelect = (interlocutorId) => {
      const existingChat = userChats.find((chat) =>
         chat.members.includes(interlocutorId),
      );

      if (existingChat) {
         updateCurrentChat(existingChat);
         onSelectConversation(existingChat._id);
      } else {
         handleCreateChat(interlocutorId);
      }
   };

   const chatStyle = {
      height: `calc(100vh - 8.6rem)`,
   };

   const containerStyle = {
      minHeight: `calc(100vh - 14.9rem)`,
   };

   if (userChats.length < 1) {
      return (
         <div className="w-[400px] bg-white border-r border-gray-200 overflow-y-auto shadow-lg ">
            <div className="relative w-80 mx-auto my-4">
               <input
                  className="w-full h-10 pl-10 pr-10 rounded-lg border focus:outline-none font-jakarta"
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => {
                     setSearchText(e.target.value);
                  }}
               />
               <img
                  src="/img/search.png"
                  alt="search"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
               />
            </div>
            <div className="bg-white" style={chatStyle}>
               {searchText ? (
                  filteredPotentialChats.map((convo) => {
                     const lastMessage = getLastMessage(convo._id);

                     return (
                        <ConversationItem
                           user={user}
                           key={convo?._id}
                           interlocutorId={convo._id}
                           name={convo?.name}
                           message={lastMessage}
                           time={convo?.time}
                           active={convo?.active}
                           onClick={() => {
                              handleChatSelect(convo._id);
                           }}
                        />
                     );
                  })
               ) : (
                  <div className=" bg-white" style={chatStyle}>
                     <div
                        className="flex flex-col items-center justify-center"
                        style={containerStyle}
                     >
                        <div className="mb-4 text-6xl">
                           <span role="img" aria-label="Sad face emoji">
                              🥺
                           </span>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">
                           У вас нет переписок
                        </h2>
                        <p className="text-gray-500 mb-4">
                           Найдите хотя бы одного друга
                        </p>
                     </div>
                  </div>
               )}
            </div>
         </div>
      );
   }

   return (
      <div className="w-[400px] bg-white border-r border-gray-200 overflow-y-auto shadow-lg ">
         <div className="relative w-80 mx-auto my-4">
            <input
               className="w-full h-10 pl-10 pr-10 rounded-lg border focus:outline-none font-jakarta"
               type="text"
               placeholder="Search"
               value={searchText}
               onChange={(e) => {
                  setSearchText(e.target.value);
               }}
            />
            <img
               src="/img/search.png"
               alt="search"
               className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
            />
         </div>
         <div className=" bg-white" style={chatStyle}>
            {searchText
               ? filteredPotentialChats.map((convo) => {
                    const lastMessage = getLastMessage(convo._id);

                    return (
                       <ConversationItem
                          user={user}
                          key={convo?._id}
                          interlocutorId={convo._id}
                          name={convo?.name}
                          message={lastMessage}
                          time={convo?.time}
                          active={convo?.active}
                          onClick={() => {
                             handleChatSelect(convo._id);
                          }}
                       />
                    );
                 })
               : userChats.map((convo) => {
                    const lastMessageInfo = getLastMessageInfo(convo._id);
                    const interlocutorId = getInterlocutor(convo.members);

                    let isSelected = false;

                    if (currentChat._id == convo._id) {
                       isSelected = true;
                    }

                    return (
                       <ConversationItem
                          isSelected={isSelected}
                          user={user}
                          key={convo._id}
                          interlocutorId={interlocutorId}
                          name={convo.name}
                          message={lastMessageInfo?.message}
                          time={lastMessageInfo?.time}
                          active={convo.active}
                          onClick={() => {
                             onSelectConversation(convo.id);
                             updateCurrentChat(convo);
                          }}
                       />
                    );
                 })}
         </div>
      </div>
   );
};

export default ConversationsList;
