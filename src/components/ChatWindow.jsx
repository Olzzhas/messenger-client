import React, { useContext, useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import axios from 'axios';
import { ChatContext } from '../context/ChatContext';
import InputEmoji from 'react-input-emoji';
import { getRequest } from '../utils/services';
import { FaFileAlt, FaFileImage, FaTimes } from 'react-icons/fa'; // Add icons

const MessageInput = ({ user }) => {
   const { sendTextMessage, currentChat } = useContext(ChatContext);

   const [message, setMessage] = useState('');
   const [file, setFile] = useState(null);
   const [showPopup, setShowPopup] = useState(false);

   const handleSend = async () => {
      let fileUrl = null;

      if (file) {
         const formData = new FormData();
         formData.append('file', file);

         try {
            const response = await axios.post(
               // 'https://messenger-node.onrender.com/storage/upload',
               'http://localhost:4000/storage/upload',
               formData,
               {
                  headers: {
                     'Content-Type': 'multipart/form-data',
                  },
               },
            );
            fileUrl = response.data.fileUrl;
         } catch (error) {
            console.error('Error uploading file:', error);
         }
      }

      sendTextMessage(message, user, currentChat._id, fileUrl);
      setMessage('');
      setFile(null); // Clear the file input
      setShowPopup(false); // Close the popup
   };

   const handleFileChange = (event) => {
      setFile(event.target.files[0]);
      setShowPopup(true); // Show the popup when a file is selected
   };

   const closePopup = () => {
      setShowPopup(false);
      setFile(null);
   };

   const getFileIcon = (file) => {
      const fileType = file.type.split('/')[0];
      if (fileType === 'image') return <FaFileImage size={40} />;
      return <FaFileAlt size={40} />;
   };

   if (currentChat == null) {
      return null;
   }

   return (
      <div className="flex-col items-center p-4 border-gray-300 w-[600px] m-auto bg-white">
         <div className="flex w-full border border-gray-300 rounded-t-xl focus-within:outline-none">
            <InputEmoji
               value={message}
               onChange={setMessage}
               cleanOnEnter
               onEnter={handleSend}
               placeholder="Write a message..."
               className="flex-1 p-4 h-[60px] font-jakarta focus:outline-none w-full"
               borderRadius={0}
               borderColor="white"
            />
         </div>
         <div className="flex items-center px-4 justify-between p-2 border-l border-r border-b border-gray-300 rounded-b-xl bg-[#f8f9fa] h-[60px] shadow-lg">
            <div className="flex align-middle items-center">
               <label className="cursor-pointer" htmlFor="fileInput">
                  <svg
                     width="15"
                     height="18"
                     viewBox="0 0 15 18"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.56475 1.7712C10.1592 1.23258 10.938 0.943178 11.74 0.962923C12.5419 0.982667 13.3055 1.31004 13.8727 1.87727C14.44 2.44449 14.7673 3.20812 14.7871 4.01006C14.8068 4.81199 14.5174 5.59081 13.9788 6.18526C13.9729 6.19178 13.9669 6.19818 13.9607 6.20444L6.20287 14.0716C6.19465 14.08 6.18619 14.0881 6.1775 14.0959C5.82083 14.4191 5.35354 14.5928 4.87238 14.5809C4.39122 14.5691 3.93304 14.3726 3.59271 14.0323C3.25237 13.692 3.05595 13.2338 3.0441 12.7526C3.03225 12.2715 3.20589 11.8042 3.52907 11.4475C3.53479 11.4412 3.54064 11.435 3.54661 11.4289L10.0544 4.81174C10.2965 4.56563 10.6922 4.56234 10.9383 4.80437C11.1844 5.04641 11.1877 5.44212 10.9456 5.68822L4.44834 12.2947C4.34513 12.4126 4.28986 12.565 4.29372 12.7219C4.29767 12.8823 4.36315 13.035 4.47659 13.1484C4.59004 13.2619 4.74276 13.3273 4.90315 13.3313C5.05868 13.3351 5.20986 13.2808 5.32729 13.1793L13.0607 5.33684C13.3786 4.98134 13.5492 4.5179 13.5375 4.04082C13.5256 3.55966 13.3292 3.10149 12.9889 2.76115C12.6485 2.42082 12.1904 2.22439 11.7092 2.21254C11.2335 2.20083 10.7713 2.37043 10.4162 2.68661L2.66855 10.5435C2.08335 11.1287 1.75458 11.9224 1.75458 12.75C1.75458 13.5776 2.08334 14.3713 2.66854 14.9565C3.25374 15.5417 4.04744 15.8704 4.87503 15.8704C5.70263 15.8704 6.49633 15.5417 7.08153 14.9565L13.4961 8.5575C13.7405 8.31372 14.1362 8.3142 14.38 8.55858C14.6238 8.80295 14.6233 9.19868 14.3789 9.44246L7.96541 15.8404C7.14579 16.66 6.03415 17.1204 4.87503 17.1204C3.71592 17.1204 2.60427 16.66 1.78465 15.8404C0.965035 15.0207 0.504578 13.9091 0.504578 12.75C0.504578 11.5916 0.96443 10.4807 1.78304 9.66122L9.53938 1.79552C9.54761 1.78718 9.55607 1.77907 9.56475 1.7712Z"
                        fill="#0E1114"
                     />
                  </svg>
               </label>
               <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
               />
            </div>
            <button className="bg-[#0086EA] rounded-lg" onClick={handleSend}>
               <span className="font-jakarta font-[500] text-[14px] text-white p-4">
                  Send
               </span>
            </button>
         </div>

         {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
               <div className="bg-white rounded-lg p-4 w-96 relative">
                  <button
                     className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                     onClick={closePopup}
                  >
                     <FaTimes size={20} />
                  </button>
                  <div className="flex items-center">
                     {file.type.startsWith('image/') ? (
                        <img
                           src={URL.createObjectURL(file)}
                           alt="Preview"
                           className="w-16 h-16 object-cover mr-4"
                        />
                     ) : (
                        getFileIcon(file)
                     )}
                     <div className="flex-1">
                        <p className="text-lg font-semibold">{file.name}</p>
                     </div>
                  </div>
                  <InputEmoji
                     value={message}
                     onChange={setMessage}
                     cleanOnEnter
                     onEnter={handleSend}
                     placeholder="Write a message..."
                     className="flex-1 p-4 h-[60px] font-jakarta focus:outline-none w-full mt-4"
                     borderRadius={0}
                     borderColor="white"
                  />
                  <button
                     className="bg-[#0086EA] rounded-lg w-full mt-4 p-2"
                     onClick={handleSend}
                  >
                     <span className="font-jakarta font-[500] text-[14px] text-white">
                        Send
                     </span>
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

const ChatWindow = ({ user }) => {
   const { messages, currentChat } = useContext(ChatContext);

   const [interlocutor, setInterlocutor] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   const bottomRef = useRef(null);
   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'auto' });
   }, [messages]);

   let interlocutorId;

   currentChat.members.map((member) => {
      if (member !== user.user.id) {
         interlocutorId = member;
      }
   });

   useEffect(() => {
      const fetchData = async () => {
         const response = await getRequest(`/user/certain/${interlocutorId}`);

         setInterlocutor(response[0]);
         setIsLoading(false);
      };
      fetchData();
   }, [currentChat]);

   if (isLoading) {
      return console.log('loading chats...');
   }

   const containerStyle = {
      minHeight: `calc(100vh - 4.2rem)`,
   };

   const chatStyle = {
      height: `calc(100vh - 16rem)`,
   };

   return (
      <div
         className="flex flex-col justify-between p-4 w-[100%] bg-white"
         style={containerStyle}
      >
         <div className="overflow-y-auto scrollbar" style={chatStyle}>
            {messages?.map((msg, index) => (
               <div key={index}>
                  <ChatMessage
                     sender={msg.senderId}
                     message={msg.text}
                     fileUrl={msg.file_url}
                     time={msg.createdAt}
                     interlocutor={interlocutor}
                  />
               </div>
            ))}
            <div ref={bottomRef} />
         </div>
         <div>
            <MessageInput user={user} />
         </div>
      </div>
   );
};

export default ChatWindow;
