import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import WeatherPopup from './WeatherPopup';
import { useNavigate } from 'react-router-dom';
import { getRequest } from '../utils/services';
// const socket = io.connect('https://messenger-node.onrender.com');
const socket = io.connect('http://localhost:4000');

const Navbar = () => {
   const { user, userLoading } = useContext(AuthContext);
   const { currentChat, onlineUsers } = useContext(ChatContext);

   let interlocutorId;
   let isOnline = false;

   if (currentChat !== null) {
      currentChat.members.map((member) => {
         if (member !== user.user.id) {
            interlocutorId = member;
         }
      });

      onlineUsers.map((user) => {
         if (user === interlocutorId) {
            isOnline = true;
         }
      });
   }

   const navigate = useNavigate();

   useEffect(() => {
      socket.on('receive_message', (data) => {
         alert(data.message);
      });
   }, [socket]);

   if (userLoading) {
      return;
   }

   return (
      <div className="flex items-center justify-between bg-white p-4 border-b border-gray-200">
         <div
            className="flex items-center cursor-pointer"
            onClick={() => {
               navigate('/');
            }}
         >
            <div className="text-blue-600 font-bold text-xl flex">
               <img src="/img/logo.png" className="mr-2" />
               <span className="text-gray-700 font-jakartad">E-Message</span>
            </div>
            <span
               style={{ marginLeft: '16rem' }}
               className=" text-gray-500 font-jakarta"
            >
               {/* {isOnline ? 'Online' : 'Offline'} */}
            </span>
         </div>

         <div className="flex items-center w-[150px] justify-between">
            <button
               onClick={() => {
                  navigate('/settings');
               }}
               className="mr-4 text-gray-500 hover:text-gray-700"
            >
               <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     fill-rule="evenodd"
                     clip-rule="evenodd"
                     d="M7.78838 0.99568C7.99437 0.929185 8.21904 0.954928 8.40465 1.06629L10.597 2.38169C10.8657 2.36968 11.1348 2.36969 11.4036 2.38172L13.5868 1.07522C13.7709 0.965066 13.9933 0.939006 14.1978 1.00363C15.6306 1.45627 16.9478 2.21489 18.0583 3.22695C18.2175 3.37203 18.3067 3.57855 18.303 3.79391L18.2601 6.34226C18.4082 6.5696 18.544 6.80466 18.6671 7.04644L20.8895 8.28204C21.0766 8.38608 21.2103 8.56514 21.257 8.77411C21.584 10.2386 21.5874 11.7567 21.2671 13.2226C21.2211 13.4334 21.0865 13.6141 20.8978 13.7186L18.6668 14.9543C18.5438 15.1958 18.4081 15.4307 18.2601 15.6578L18.303 18.2062C18.3067 18.4215 18.2175 18.6281 18.0583 18.7731C16.9501 19.783 15.6385 20.5438 14.2117 21.0044C14.0057 21.0709 13.781 21.0452 13.5954 20.9338L11.4031 19.6184C11.1343 19.6304 10.8652 19.6304 10.5965 19.6184L8.41328 20.9249C8.2292 21.035 8.00676 21.0611 7.80221 20.9964C6.36949 20.5438 5.05226 19.7852 3.94172 18.7731C3.78251 18.628 3.69337 18.4215 3.69701 18.2061L3.73996 15.6636C3.59279 15.4338 3.45708 15.197 3.33335 14.9539L1.11058 13.718C0.923448 13.614 0.789706 13.4349 0.74305 13.226C0.416081 11.7615 0.412631 10.2434 0.73294 8.77744C0.77899 8.56668 0.913562 8.38596 1.10228 8.28145L3.33326 7.04582C3.45625 6.80426 3.59199 6.56941 3.73991 6.34226L3.69701 3.79391C3.69338 3.57854 3.78253 3.37201 3.94174 3.22693C5.04995 2.21708 6.36157 1.45627 7.78838 0.99568ZM5.20264 4.11567L5.24367 6.55304C5.24633 6.71094 5.19907 6.86566 5.10864 6.99513C4.90747 7.28314 4.73135 7.58786 4.58221 7.90593C4.51517 8.04893 4.40469 8.16711 4.26653 8.24363L2.13328 9.42512C1.94669 10.4669 1.94928 11.5338 2.14094 12.5746L4.2676 13.757C4.40471 13.8333 4.51447 13.9506 4.58142 14.0925C4.73384 14.4154 4.9116 14.7258 5.11306 15.0207C5.20066 15.1489 5.24629 15.3012 5.24367 15.4565L5.20266 17.8843C6.01332 18.5691 6.94034 19.1029 7.93958 19.4603L10.0243 18.2127C10.1563 18.1337 10.3094 18.0972 10.4629 18.1082C10.8205 18.1338 11.1795 18.1338 11.5371 18.1082C11.6909 18.0972 11.8443 18.1339 11.9765 18.2132L14.0679 19.468C15.0639 19.105 15.988 18.5689 16.7974 17.8844L16.7564 15.447C16.7537 15.2891 16.801 15.1344 16.8914 15.0049C17.0926 14.7169 17.2687 14.4122 17.4178 14.0941C17.4849 13.9511 17.5954 13.833 17.7335 13.7564L19.8668 12.575C20.0534 11.5332 20.0508 10.4663 19.8591 9.42543L17.7325 8.24304C17.5948 8.1665 17.4847 8.04855 17.4178 7.90593C17.2687 7.58786 17.0926 7.28314 16.8914 6.99513C16.801 6.86566 16.7537 6.71094 16.7564 6.55304L16.7974 4.11577C15.9868 3.43094 15.0597 2.89715 14.0605 2.53982L11.9758 3.78736C11.8437 3.86636 11.6906 3.90286 11.5371 3.89188C11.1795 3.8663 10.8205 3.8663 10.4629 3.89188C10.3091 3.90288 10.1557 3.86622 10.0235 3.78691L7.93211 2.53206C6.93614 2.89505 6.01209 3.43117 5.20264 4.11567ZM11 7.25004C8.92896 7.25004 7.25003 8.92897 7.25003 11C7.25003 13.0711 8.92896 14.75 11 14.75C13.0711 14.75 14.75 13.0711 14.75 11C14.75 8.92897 13.0711 7.25004 11 7.25004ZM5.75003 11C5.75003 8.10054 8.10053 5.75004 11 5.75004C13.8995 5.75004 16.25 8.10054 16.25 11C16.25 13.8995 13.8995 16.25 11 16.25C8.10053 16.25 5.75003 13.8995 5.75003 11Z"
                     fill="#616C76"
                  />
               </svg>
            </button>
            <button
               // onClick={}
               className="mr-4 text-gray-500 hover:text-gray-700"
            >
               <svg
                  width="4"
                  height="16"
                  viewBox="0 0 4 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M2 9.125C2.62132 9.125 3.125 8.62132 3.125 8C3.125 7.37868 2.62132 6.875 2 6.875C1.37868 6.875 0.875 7.37868 0.875 8C0.875 8.62132 1.37868 9.125 2 9.125Z"
                     fill="#616C76"
                  />
                  <path
                     d="M2 3.125C2.62132 3.125 3.125 2.62132 3.125 2C3.125 1.37868 2.62132 0.875 2 0.875C1.37868 0.875 0.875 1.37868 0.875 2C0.875 2.62132 1.37868 3.125 2 3.125Z"
                     fill="#616C76"
                  />
                  <path
                     d="M2 15.125C2.62132 15.125 3.125 14.6213 3.125 14C3.125 13.3787 2.62132 12.875 2 12.875C1.37868 12.875 0.875 13.3787 0.875 14C0.875 14.6213 1.37868 15.125 2 15.125Z"
                     fill="#616C76"
                  />
               </svg>
            </button>

            <img
               src={user.user.image_url ? user.user.image_url : '/ava/user.png'}
               alt="User"
               className="h-8 w-8 rounded-full object-cover"
            />
         </div>
      </div>
   );
};

export default Navbar;
