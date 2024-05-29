import { createContext, useState, useEffect, useCallback } from 'react';
import { getRequest, postRequest } from '../utils/services';

import { io } from 'socket.io-client';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
   const [userChats, setUserChats] = useState([]);
   const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
   const [userChatsError, setUserChatsError] = useState(null);
   const [potentialChats, setPotentialChats] = useState([]);
   const [currentChat, setCurrentChat] = useState(null);
   const [messages, setMessages] = useState(null);
   const [isMessagesLoading, setIsMessagesLoading] = useState(false);
   const [messagesError, setMessagesError] = useState(null);
   const [sendTextMessageError, setSendTextMessageError] = useState(null);
   const [newMessage, setNewMessage] = useState(null);
   const [socket, setSocket] = useState(null);
   const [onlineUsers, setOnlineUsers] = useState(null);
   const [allMessages, setAllMessages] = useState([]);
   const [isAllMessagesLoading, setIsAllMessagesLoading] = useState(false);
   const [allMessagesError, setAllMessagesError] = useState(null);

   useEffect(() => {
      const newSocket = io('http://localhost:4000');
      setSocket(newSocket);

      return () => {
         newSocket.disconnect();
      };
   }, [user]);

   useEffect(() => {
      const storedChat = localStorage.getItem('currentChat');
      if (storedChat) {
         setCurrentChat(JSON.parse(storedChat));
      }
   }, []);

   // add online users
   useEffect(() => {
      if (socket === null) return;
      socket.emit('addNewUser', user?.user.id);
      socket.on('getOnlineUsers', (res) => {
         setOnlineUsers(res);
      });
   }, [socket]);

   // send message
   useEffect(() => {
      if (socket === null) return;

      const recipientId = currentChat?.members?.find(
         (id) => id !== user?.user.id,
      );

      socket.emit('sendMessage', { ...newMessage, recipientId });
   }, [newMessage]);

   // receive message
   useEffect(() => {
      if (socket === null) return;

      socket.on('getMessage', (res) => {
         if (currentChat?._id !== res.chatId) return;

         setMessages((prev) => [...prev, res]);
      });

      return () => {
         socket.off('getMessage');
      };
   }, [socket, currentChat]);

   useEffect(() => {
      const getUsers = async () => {
         const response = await getRequest(`/user/all`);

         if (response.error) {
            return console.log('Error fetching users', response);
         }

         const pChats = response.filter((u) => {
            let isChatCreated = false;

            if (user?._id === u._id) return false;

            if (userChats) {
               isChatCreated = userChats?.some((chat) => {
                  return chat.members[0] === u.id || chat.members[1] === u.id;
               });
            }

            return !isChatCreated;
         });
         setPotentialChats(pChats);
      };

      getUsers();
   }, [userChats]);

   useEffect(() => {
      const getUserChats = async () => {
         if (user?.user.id) {
            setIsUserChatsLoading(true);
            setUserChatsError(null);

            const response = await getRequest(`/chat/${user.user.id}`);
            console.log(response);

            setIsUserChatsLoading(false);

            if (response.error) {
               return setUserChatsError(response);
            }

            setUserChats(response);
         }
      };

      getUserChats();
   }, [user]);

   useEffect(() => {
      const getMessages = async () => {
         setIsMessagesLoading(true);
         setMessagesError(null);

         const response = await getRequest(`/chat/message/${currentChat?._id}`);

         setIsMessagesLoading(false);

         if (response.error) {
            return setMessagesError(response);
         }

         setMessages(response);
      };

      getMessages();
   }, [currentChat]);

   useEffect(() => {
      const getAllMessages = async () => {
         setIsAllMessagesLoading(true);
         setAllMessagesError(null);

         const response = await getRequest(`/chat/`);

         setIsAllMessagesLoading(false);

         if (response.error) {
            return setAllMessagesError(response);
         }

         setAllMessages(response);
      };

      getAllMessages();
   }, []);

   const updateCurrentChat = useCallback((chat) => {
      localStorage.setItem('currentChat', JSON.stringify(chat));
      setCurrentChat(chat);
   }, []);

   const sendTextMessage = useCallback(
      async (textMessage, sender, currentChatId) => {
         if (!textMessage) return console.log('You must type something...');

         const response = await postRequest(`/chat/message`, {
            chatId: currentChatId,
            senderId: sender.user.id,
            text: textMessage,
         });

         if (response.error) {
            return setSendTextMessageError(response);
         }

         setNewMessage(response);
         setMessages((prev) => [...prev, response]);
      },
      [],
   );

   const createChat = useCallback(async (firstId, secondId) => {
      const response = await postRequest(
         `/chat`,
         JSON.stringify({
            firstId,
            secondId,
         }),
      );

      if (response.error) {
         return console.log('Error creating chat', response);
      }

      setUserChats((prev) => [...prev, response]);
   }, []);

   return (
      <ChatContext.Provider
         value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            updateCurrentChat,
            createChat,
            currentChat,
            messages,
            isMessagesLoading,
            messagesError,
            sendTextMessage,
            sendTextMessageError,
            newMessage,
            onlineUsers,
            allMessages,
            allMessagesError,
            isAllMessagesLoading,
         }}
      >
         {children}
      </ChatContext.Provider>
   );
};
