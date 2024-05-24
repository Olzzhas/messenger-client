import React from 'react';

const UserInfoPanel = ({ user, onClose }) => (
   <div className="w-72 border-l border-gray-200 p-4">
      <button className="mb-4 text-red-500" onClick={onClose}>
         X
      </button>
      <div className="text-center">
         <img
            className="w-24 h-24 mx-auto rounded-full"
            src={user.avatar}
            alt={`${user.name}'s avatar`}
         />
         <div className="mt-4 text-xl font-bold">{user.name}</div>
         <div className="mt-2 text-sm text-gray-600">{user.bio}</div>
         <div className="mt-4">
            <button className="w-full mb-2 py-2 text-white bg-red-500 rounded">
               Block user
            </button>
            <button className="w-full mb-2 py-2 text-white bg-gray-500 rounded">
               Clear history
            </button>
            <button className="w-full py-2 text-white bg-blue-500 rounded">
               Delete conversation
            </button>
         </div>
      </div>
   </div>
);

export default UserInfoPanel;
