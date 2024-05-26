import React, { useContext } from 'react';
import Layout from './components/Layout';
import Container from './components/Container';

import Main from './pages/Main';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

function App() {
   const { user } = useContext(AuthContext);

   return (
      <ChatContextProvider user={user}>
         <Layout>
            <Container>
               <Main />
            </Container>
         </Layout>
      </ChatContextProvider>
   );
}

export default App;
