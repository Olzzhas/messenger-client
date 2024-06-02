import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaFileAlt } from 'react-icons/fa';

const ChatMessage = ({ sender, message, time, interlocutor, fileUrl }) => {
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

   function getFileName(url) {
      return url.split('/').pop();
   }

   function isImageFile(url) {
      const fileName = getFileName(url);
      const fileExtension = fileName.split('.').pop().toLowerCase();

      return ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
   }

   function handleFileDownload(url) {
      const fileName = getFileName(url);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
   }

   const renderFile = () => {
      if (isImageFile(fileUrl)) {
         console.log(fileUrl);
         return (
            <img
               src={fileUrl}
               alt={getFileName(fileUrl)}
               width={300}
               className="max-w-full h-auto mb-2 cursor-pointer rounded-2xl"
               onClick={() => handleFileDownload(fileUrl)}
            />
         );
      } else {
         return (
            <div
               className="flex items-center mb-2 cursor-pointer"
               onClick={() => handleFileDownload(fileUrl)}
            >
               <FaFileAlt size={40} />
               <span className="ml-2 underline text-blue-500">
                  {getFileName(fileUrl)}
               </span>
            </div>
         );
      }
   };

   const renderMessageContent = () => {
      return (
         <>
            {fileUrl && renderFile()}
            <div className="p-4 rounded-tr-xl text-left rounded-tl-xl rounded-bl-xl bg-[#EEF1F4] max-w-[450px]">
               <span className="font-[400] font-jakarta">{message}</span>
            </div>
         </>
      );
   };

   if (sender === user.user.id) {
      return (
         <div className="mb-4 flex justify-end">
            <div className="font-semibold text-right flex items-end">
               <div className="mr-2">
                  {renderMessageContent()}
                  <div className="text-xs text-gray-400">
                     {convertToTime(time)}
                  </div>
               </div>
            </div>
         </div>
      );
   }

   if (sender !== user.user.id) {
      return (
         <div className="mb-4 flex items-end">
            <div className="font-semibold text-left flex items-end">
               <div className="w-[36px] h-[36px] overflow-hidden rounded-full mr-4">
                  <img
                     src={
                        interlocutor.image_url
                           ? interlocutor.image_url
                           : '/ava/user.png'
                     }
                     alt="ava"
                  />
               </div>
               <div className="ml-2">
                  {renderMessageContent()}
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
