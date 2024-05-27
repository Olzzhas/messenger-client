import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
   const { updateAuthorizeInfo, authorizeInfo, authorizeUser, user } =
      useContext(AuthContext);

   console.log(JSON.parse(localStorage.getItem('user')));

   return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
         <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-center font-jakarta mb-4">
               Sign In
            </h2>
            <div className="space-y-4">
               <div>
                  <label
                     htmlFor="email"
                     className="block text-sm font-jakarta font-medium text-gray-700"
                  >
                     Email
                  </label>
                  <input
                     onChange={(e) => {
                        updateAuthorizeInfo({
                           ...authorizeInfo,
                           email: e.target.value,
                        });
                     }}
                     type="email"
                     id="email"
                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm font-jakarta focus:outline-none focus:ring-indigo-500 focus:border-[#0186ea] sm:text-sm"
                  />
               </div>
               <div>
                  <label
                     htmlFor="password"
                     className="block text-sm font-jakarta font-medium text-gray-700"
                  >
                     Password
                  </label>
                  <input
                     onChange={(e) => {
                        updateAuthorizeInfo({
                           ...authorizeInfo,
                           password: e.target.value,
                        });
                     }}
                     type="password"
                     id="password"
                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm font-jakarta focus:outline-none focus:ring-indigo-500 focus:border-[#0186ea] sm:text-sm"
                  />
               </div>
               <div>
                  <button
                     onClick={authorizeUser}
                     // type="submit"
                     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-jakarta font-medium text-white bg-[#0186ea] hover:bg-[#3479ad] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                     Sign In
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
