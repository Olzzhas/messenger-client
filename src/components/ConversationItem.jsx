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
   isSelected,
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

   function convertToTime(dateString) {
      if (!dateString) {
         return '';
      }
      const date = new Date(dateString);

      let hours = date.getUTCHours();
      let minutes = date.getUTCMinutes();

      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      const timeString = `${hours}:${minutes} ${ampm}`;

      return timeString;
   }

   if (isLoading) {
      return;
   }

   const truncateMessage = (msg, length) => {
      return msg?.length > length ? `${msg.slice(0, length)}...` : msg;
   };

   return (
      <div
         className={
            isSelected
               ? 'p-4 cursor-pointer bg-[#ebe9e8]'
               : 'p-4 cursor-pointer bg-white'
         }
         onClick={onClick}
      >
         <div className="flex justify-between items-center">
            <div className="w-[48px] h-[48px] overflow-hidden rounded-full">
               <img
                  src={
                     interlocutor.image_url
                        ? interlocutor.image_url
                        : '/ava/user.png'
                  }
                  alt="ava"
               />
            </div>
            <div className="flex-grow px-4 items-center align-middle">
               <div className="flex justify-between">
                  <div className="font-[700] font-jakarta">
                     {interlocutor.name}
                  </div>
                  <span className="text-[14px] text-[#8FA0AF]">
                     {convertToTime(time)}
                  </span>
               </div>
               <div className="text-sm font-[300] text-gray-600 font-jakarta">
                  {truncateMessage(message, 30)}
               </div>
            </div>
            {/* <div className="text-xs text-gray-400 font-jakarta">
               {convertToTime(time)}
            </div> */}
         </div>
      </div>
   );
};

export default ConversationItem;
