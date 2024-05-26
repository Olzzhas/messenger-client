import { useState } from 'react';

const ChatMessage = ({ sender, message, time }) => {
   if (sender === 'me') {
      return (
         <div className="mb-4 flex justify-end">
            <div className={`font-semibold text-right flex items-end`}>
               <div className="mr-2">
                  <div className="p-4 rounded-tr-xl rounded-tl-xl rounded-bl-xl bg-[#EEF1F4]">
                     <span className="font-[400] font-jakarta">{message}</span>
                  </div>
                  <div className="text-xs text-gray-400">{time}</div>
               </div>
            </div>
         </div>
      );
   }

   if (sender !== 'me') {
      return (
         <div className="mb-4 flex items-end">
            <div className={`font-semibold text-left flex items-end`}>
               <div className="w-[36px] h-[36px] overflow-hidden rounded-full mr-4">
                  <img src="/ava/maksat.png" alt="ava" />
               </div>

               <div className="ml-2">
                  <div className="p-4 rounded-tr-xl rounded-tl-xl rounded-br-xl bg-[#EEF1F4] max-w-[450px]">
                     <span className="font-[400] font-jakarta">{message}</span>
                  </div>
                  <div className="text-xs text-gray-400">{time}</div>
               </div>
            </div>
         </div>
      );
   }
};

export default ChatMessage;
