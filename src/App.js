import React, { useContext } from 'react';
import Layout from './components/Layout';
import Container from './components/Container';

import Main from './pages/Main';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import Login from './pages/Login';
import Register from './pages/Register';

import { Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Settings from './pages/Settings';

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

                  <Route element={<ProtectedRoute />}>
                     <Route path="/settings" element={<Settings />} />
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
               </Routes>
            </Container>
         </Layout>
      </ChatContextProvider>
   );
}

export default App;
