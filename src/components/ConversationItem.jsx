import React, { useContext, useEffect, useState } from 'react';
import { getRequest } from '../utils/services';
import { useFetchRecipientUser } from '../hooks/useFetchRecipientUser';
import { ChatContext } from '../context/ChatContext';

const ConversationItem = ({
   user,
   name,
   message,
   time,
   active,
   onClick,
   interlocutorId,
}) => {
   const { currentChat } = useContext(ChatContext);
   const [interlocutor, setIntelocutor] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const getUser = async () => {
         const response = await getRequest(`/user/certain/${interlocutorId}`);

         setIntelocutor(response[0]);
         setIsLoading(false);
      };

      getUser();
   }, []);

   const truncateMessage = (msg, length) => {
      return msg.length > length ? `${msg.slice(0, length)}...` : msg;
   };

   if (isLoading) {
      return;
   }

   return (
      <div className={`p-4 cursor-pointer bg-white`} onClick={onClick}>
         <div className="flex justify-between items-center">
            <div className="w-[48px] h-[48px] overflow-hidden rounded-full">
               <img src={interlocutor.image_url} alt="ava" />
            </div>
            <div className="flex-grow px-4">
               <div className="font-[700] font-jakarta">
                  {interlocutor.name}
               </div>
               <div className="text-sm text-gray-600 font-jakarta">
                  {truncateMessage(message, 31)}
               </div>
            </div>
            <div className="text-xs text-gray-400 font-jakarta">{time}</div>
         </div>
      </div>
   );
};

export default ConversationItem;
