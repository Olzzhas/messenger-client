import React, { useContext } from 'react';
import Layout from './components/Layout';
import Container from './components/Container';

import Main from './pages/Main';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import Login from './pages/Login';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
   const { user } = useContext(AuthContext);

   return (
      <ChatContextProvider user={user}>
         <Layout>
            <Container>
               <Routes>
                  <Route element={<ProtectedRoute />}>
                     <Route path="/" element={<Main />} />
                  </Route>
                  <Route path="/login" element={<Login />} />
               </Routes>
            </Container>
         </Layout>
      </ChatContextProvider>
   );
}

export default App;
