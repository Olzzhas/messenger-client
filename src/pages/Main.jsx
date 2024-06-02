import { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import ConversationsList from '../components/ConversationList';
import ChatWindow from '../components/ChatWindow';
import UserInfoPanel from '../components/UserInfoPanel';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Main = () => {
   const { user, userLoading } = useContext(AuthContext);
   const { userChats, isUserChatsLoading, allMessages, IsAllMessagesLoading } =
      useContext(ChatContext);

   const [selectedConversation, setSelectedConversation] = useState(
      userChats[0],
   );

   const [showUserInfo, setShowUserInfo] = useState(false);

   const handleSelectConversation = (id) => {
      const conversation = userChats.find((convo) => convo.id === id);
      setSelectedConversation(conversation);
   };

   const handleShowUserInfo = () => {
      setShowUserInfo(true);
   };

   const handleCloseUserInfo = () => {
      setShowUserInfo(false);
   };

   if (isUserChatsLoading || IsAllMessagesLoading || userLoading) {
      return <span>loading</span>;
   }

   return (
      <>
         <Navbar handleShowUserInfo={handleShowUserInfo} />
         <div className="flex h-full">
            <ConversationsList
               userChats={userChats}
               allMessages={allMessages}
               user={user}
               onSelectConversation={handleSelectConversation}
            />
            <div className="flex-1 relative">
               {selectedConversation && <ChatWindow user={user} />}
            </div>
            {showUserInfo && selectedConversation && (
               <UserInfoPanel
                  conv={selectedConversation}
                  onClose={handleCloseUserInfo}
               />
            )}
         </div>
      </>
   );
};

export default Main;
