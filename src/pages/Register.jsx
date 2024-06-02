import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const {
      updateRegisterInfo,
      registerInfo,
      registerUser,
      registerError,
      user,
   } = useContext(AuthContext);
   const navigate = useNavigate();
   return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
         <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-center font-jakarta mb-4">
               Sign Up
            </h2>
            <div className="space-y-4">
               <div>
                  <label
                     htmlFor="name"
                     className="block text-sm font-jakarta font-medium text-gray-700"
                  >
                     Name
                  </label>
                  <input
                     onChange={(e) => {
                        updateRegisterInfo({
                           ...registerInfo,
                           name: e.target.value,
                        });

                        console.log(registerInfo);
                     }}
                     type="text"
                     id="name"
                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm font-jakarta focus:outline-none focus:ring-indigo-500 focus:border-[#0186ea] sm:text-sm"
                  />
               </div>
               <div>
                  <label
                     htmlFor="email"
                     className="block text-sm font-jakarta font-medium text-gray-700"
                  >
                     Email
                  </label>
                  <input
                     onChange={(e) => {
                        updateRegisterInfo({
                           ...registerInfo,
                           email: e.target.value,
                        });

                        console.log(registerInfo);
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
                        updateRegisterInfo({
                           ...registerInfo,
                           password: e.target.value,
                        });
                        console.log(registerInfo);
                     }}
                     type="password"
                     id="password"
                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm font-jakarta focus:outline-none focus:ring-indigo-500 focus:border-[#0186ea] sm:text-sm"
                  />
               </div>
               <div>
                  <button
                     onClick={registerUser}
                     // type="submit"
                     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-jakarta font-medium text-white bg-[#0186ea] hover:bg-[#3479ad] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                     Sign Up
                  </button>
               </div>

               <div className="pt-2">
                  {registerError ? (
                     <span className="font-jakarta text-red-500">
                        {registerError}
                     </span>
                  ) : (
                     ''
                  )}
               </div>

               <div>
                  <span className="font-jakarta text-[16px]">
                     Уже зарегистрированы?{' '}
                  </span>
                  <a
                     className="font-jakarta ml-2 cursor-pointer text-[16px] text-gray-800"
                     onClick={() => {
                        navigate('/login');
                     }}
                  >
                     Войти
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
