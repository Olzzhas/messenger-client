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

   const [conversations, setConversations] = useState([userChats]);

   const [selectedConversation, setSelectedConversation] = useState(
      conversations[0],
   );
   const [showUserInfo, setShowUserInfo] = useState(false);

   const handleSelectConversation = (id) => {
      const conversation = conversations.find((convo) => convo.id === id);
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
         <Navbar />
         <div className="flex h-full">
            <ConversationsList
               userChats={userChats}
               allMessages={allMessages}
               user={user}
               onSelectConversation={handleSelectConversation}
            />
            <div className="flex-1 relative">
               {selectedConversation && <ChatWindow />}
               {/* <button
                  className="absolute top-4 right-4 text-2xl"
                  onClick={handleShowUserInfo}
               >
                  ...
               </button> */}
            </div>
            {showUserInfo && selectedConversation && (
               <UserInfoPanel
                  user={selectedConversation.user}
                  onClose={handleCloseUserInfo}
               />
            )}
         </div>
      </>
   );
};

export default Main;
