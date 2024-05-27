import axios from 'axios';

export const baseUrl = 'http://localhost:4000';

export const postRequest = async (url, body) => {
   try {
      const response = await axios.post(`${baseUrl}${url}`, body);

      return response.data;
   } catch (error) {
      alert(error);
      throw error;
   }
};

// export const postRequest = async (url, body) => {
//    try {
//       const response = await fetch(`${baseUrl}${url}`, {
//          method: 'POST',
//          headers: {
//             'Content-Type': 'application/json',
//          },
//          body,
//       });

//       console.log('before json');

//       const data = await response.json();

//       console.log('after json');

//       if (!response.ok) {
//          console.log('Performed error');
//          let message;

//          if (data?.message) {
//             message = data.message;
//          } else {
//             message = data;
//          }
//          console.log(message);
//          return { error: true, message };
//       }

//       return data;
//    } catch (error) {
//       console.log(error);
//       alert(error.message);
//       throw error;
//    }
// };

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
