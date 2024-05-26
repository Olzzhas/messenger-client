import { createContext, useCallback, useState } from 'react';
import { postRequest } from '../utils/services';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [registerError, setRegisterError] = useState(null);
   const [isRegisterLoading, setIsRegisterLoading] = useState(false);
   const [registerInfo, setRegisterInfo] = useState({
      email: '',
      password: '',
      username: '',
      name: '',
      lastname: '',
   });
   const [loginInfo, setLoginInfo] = useState({
      email: '',
      password: '',
   });

   const updateRegisterInfo = useCallback((info) => {
      setRegisterInfo(info);
   }, []);

   const registerUser = useCallback(async () => {
      setIsRegisterLoading(true);
      setRegisterInfo(null);

      const response = await postRequest(
         '/user/create',
         JSON.stringify(registerInfo),
      );

      setIsRegisterLoading(false);

      if (response.error) {
         setRegisterError(response);
      }

      localStorage.setItem('User', JSON.stringify(response));
      setUser(response);
   }, []);

   const updateLoginInfo = useCallback((info) => {
      setLoginInfo(info);
   }, []);

   return (
      <AuthContext.Provider
         value={{
            user,
            updateLoginInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
