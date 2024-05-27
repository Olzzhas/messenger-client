import React, { useEffect } from 'react';
import { getRequest } from '../utils/services';

const ConversationItem = ({
   name,
   message,
   time,
   active,
   onClick,
   interlocutorId,
}) => {
   const truncateMessage = (msg, length) => {
      return msg.length > length ? `${msg.slice(0, length)}...` : msg;
   };

   useEffect(() => {
      const getUser = async () => {
         console.log('asdassa', interlocutorId);
         const response = await getRequest(`/user/certain/${interlocutorId}`);

         console.log(response);
      };

      getUser();
   }, []);

   return (
      <div className={`p-4 cursor-pointer bg-white`} onClick={onClick}>
         <div className="flex justify-between items-center">
            <div className="w-[48px] h-[48px] overflow-hidden rounded-full">
               <img src="/ava/maksat.png" alt="ava" />
            </div>
            <div className="flex-grow px-4">
               <div className="font-[700] font-jakarta">{name}</div>
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
