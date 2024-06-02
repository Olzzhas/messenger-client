import { useEffect, useState } from 'react';
import { getRequest } from '../utils/services';
import axios from 'axios';

export const useFetchRecipientUser = (user, chat) => {
   const [recipientUser, setRecipientUser] = useState(null);
   const [error, setError] = useState(null);

   const recipientId = chat?.members?.find((id) => id !== user?.user?.id);

   useEffect(() => {
      const getUser = async () => {
         if (recipientId) return null;

         const response = await getRequest(`/user/certain/${recipientId}`);

         // const response = await axios.get(
         //    `https://messenger-node.onrender.com/user/certain/${recipientId}`,
         // );
         console.log('asdaisbdahsbd', response);

         if (response.error) {
            return setError(error);
         }

         setRecipientUser(response);
      };

      getUser();
   }, [recipientId]);

   return { recipientUser };
};
