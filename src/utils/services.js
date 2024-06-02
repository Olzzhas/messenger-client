import axios from 'axios';

export const baseUrl = 'https://messenger-node.onrender.com';
// export const baseUrl = 'http://localhost:4000';

export const postRequest = async (url, body) => {
   try {
      const response = await axios.post(`${baseUrl}${url}`, body);

      return response.data;
   } catch (error) {
      throw error;
   }
};

export const getRequest = async (url) => {
   const response = await fetch(`${baseUrl}${url}`);

   const data = await response.json();

   if (!response.ok) {
      let message = 'An message occured...';

      if (data?.message) {
         message = data.message;
      }

      return { error: true, message };
   }

   return data;
};
