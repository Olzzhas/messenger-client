import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ChatMessage = ({ sender, message, time }) => {
   const { user, userLoading } = useContext(AuthContext);

   if (userLoading) {
      return <span>Loading...</span>;
   }

   function convertToTime(dateString) {
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

   if (sender === user.user.id) {
      return (
         <div className="mb-4 flex justify-end">
            <div className={`font-semibold text-right flex items-end`}>
               <div className="mr-2">
                  <div className="p-4 rounded-tr-xl rounded-tl-xl rounded-bl-xl bg-[#EEF1F4]">
                     <span className="font-[400] font-jakarta">{message}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                     {convertToTime(time)}
                  </div>
               </div>
            </div>
         </div>
      );
   }

   if (sender !== user.user._id) {
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
                  <div className="text-xs text-gray-400">
                     {convertToTime(time)}
                  </div>
               </div>
            </div>
         </div>
      );
   }
};

export default ChatMessage;
