import { useState } from 'react';
import Navbar from '../components/Navbar';
import ConversationsList from '../components/ConversationList';
import ChatWindow from '../components/ChatWindow';
import UserInfoPanel from '../components/UserInfoPanel';

const Main = () => {
   const [conversations, setConversations] = useState([
      // Добавьте свои данные переписок
      {
         id: 1,
         name: 'Maksat Baikadamov',
         message: 'Have you been studying for exams?',
         time: '10:36 PM',
         active: true,
         messages: [
            {
               sender: 'Maksat',
               message: "What's up",
               time: '10:36 PM',
            },
            {
               sender: 'me',
               message: 'Assalamualaikum!',
               time: '10:38 AM',
            },
            {
               sender: 'Maksat',
               message:
                  'Well, there is this one girl... asdashjdbasjhd bas bashdj hasbdj sabjd bsajhdb asjhdb sajhd bajshbd jasbd h',
               time: '8:54 AM',
            },
            {
               sender: 'Caesar',
               message: 'She has another fellow?',
               time: '10:40 PM',
            },
            {
               sender: 'me',
               message: 'I don’t know, but a lot of boys like her',
               time: '10:42 PM',
            },
         ],
         user: {
            avatar: 'https://via.placeholder.com/150',
            name: 'Caesar',
            bio: 'I like talk shows',
         },
      },
      {
         id: 2,
         name: 'Caesar',
         message: 'Handsome lad like you. There must be some special girl',
         time: '10:36 PM',
         active: true,
         messages: [
            {
               sender: 'Caesar',
               message:
                  'Handsome lad like you. There must be some special girl',
               time: '10:36 PM',
            },
            {
               sender: 'me',
               message: 'Come on, what’s her name?',
               time: '4:38 AM',
            },
            {
               sender: 'Caesar',
               message: 'Well, there is this one girl...',
               time: '8:54 AM',
            },
         ],
         user: {
            avatar: 'https://via.placeholder.com/150',
            name: 'Caesar',
            bio: 'I like talk shows',
         },
      },

      // Другие переписки
   ]);

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
   return (
      <>
         <Navbar />
         <div className="flex h-full">
            <ConversationsList
               conversations={conversations}
               onSelectConversation={handleSelectConversation}
            />
            <div className="flex-1 relative">
               {selectedConversation && (
                  <ChatWindow messages={selectedConversation.messages} />
               )}
               <button
                  className="absolute top-4 right-4 text-2xl"
                  onClick={handleShowUserInfo}
               >
                  ...
               </button>
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
