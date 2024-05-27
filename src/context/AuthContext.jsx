import { createContext, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate
import { postRequest } from '../utils/services';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [userLoading, setUserLoading] = useState(true);
   const [registerError, setRegisterError] = useState(null);
   const [authorizeError, setAuthorizeError] = useState(false);
   const [isRegisterLoading, setIsRegisterLoading] = useState(false);
   const [isAuthorizeLoading, setIsAuthorizeLoading] = useState(false);
   const [registerInfo, setRegisterInfo] = useState({
      email: '',
      password: '',
      username: '',
      name: '',
      lastname: '',
   });
   const [authorizeInfo, setAuthorizeInfo] = useState({
      email: '',
      password: '',
   });

   const navigate = useNavigate();

   useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
         setUser(JSON.parse(storedUser));
      }

      setUserLoading(false);
   }, []);

   const updateRegisterInfo = useCallback((info) => {
      setRegisterInfo(info);
   }, []);

   const registerUser = useCallback(async () => {
      setIsRegisterLoading(true);
      setRegisterError(null);

      const response = await postRequest(
         '/user/create',
         JSON.stringify(registerInfo),
      );

      setIsRegisterLoading(false);

      if (response.error) {
         setRegisterError(response);
         return;
      }

      localStorage.setItem('user', JSON.stringify(response));
      setUser(response);
      navigate('/');
   }, [registerInfo, navigate]);

   const authorizeUser = useCallback(async () => {
      setIsAuthorizeLoading(true);
      setAuthorizeError(null);

      const response = await postRequest(
         `/user/login`,
         authorizeInfo,
         // JSON.stringify(authorizeInfo),
      );

      setIsAuthorizeLoading(false);

      if (response.error) {
         setAuthorizeError(response);
         return;
      }

      localStorage.setItem('user', JSON.stringify(response));
      setUser(response);
      navigate('/');
   }, [authorizeInfo, navigate]);

   const updateAuthorizeInfo = useCallback((info) => {
      setAuthorizeInfo(info);
   }, []);

   return (
      <AuthContext.Provider
         value={{
            user,
            updateAuthorizeInfo,
            updateRegisterInfo,
            authorizeInfo,
            registerUser,
            registerError,
            authorizeUser,
            authorizeError,
            userLoading,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
