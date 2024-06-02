import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
   const [userData, setUserData] = useState({
      name: 'Olzhas',
      email: 'olzhas@gmail.com',
      age: '20',
      avatar: '/ava/olzhas.jpg',
   });

   const [isEditing, setIsEditing] = useState(false);
   const [editedData, setEditedData] = useState({ ...userData });
   const navigate = useNavigate();

   useEffect(() => {
      axios
         .get('/api/user-profile')
         .then((response) => {
            setUserData(response.data);
            setEditedData(response.data); // Initialize editedData
         })
         .catch((error) => {
            console.error('Error fetching user data:', error);
         });
   }, []);

   const handleEditClick = () => {
      setIsEditing(true);
   };

   const handleInputChange = (e) => {
      setEditedData({ ...editedData, [e.target.name]: e.target.value });
   };

   const handleSaveClick = () => {
      axios
         .put('/api/user-profile', editedData)
         .then((response) => {
            setUserData(response.data);
            setIsEditing(false);
         })
         .catch((error) => {
            console.error('Error updating user data:', error);
            // Handle the error (e.g., display an error message)
         });
   };

   const handleLogout = () => {
      localStorage.removeItem('user');
      window.location.reload();
   };

   return (
      <div className="min-h-screen bg-gray-100">
         <Navbar />
         <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Настройки</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
               {/* Avatar */}
               <div className="flex items-center mb-6">
                  <img
                     width={300}
                     src={userData.avatar}
                     alt="Avatar"
                     className="overflow-hidden rounded-lg mr-4"
                  />
                  <div>
                     {isEditing ? (
                        <input
                           type="text"
                           name="name"
                           value={editedData.name}
                           onChange={handleInputChange}
                           className="border rounded py-2 px-3"
                        />
                     ) : (
                        <h2 className="text-xl font-semibold">
                           {userData.name}
                        </h2>
                     )}
                     <p className="text-gray-600">{userData.email}</p>
                  </div>
               </div>

               {/* Other Details */}

               <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2">
                     Возраст:
                  </label>
                  {isEditing ? (
                     <input
                        type="number"
                        name="age"
                        value={editedData.age}
                        onChange={handleInputChange}
                        className="border rounded py-2 px-3"
                     />
                  ) : (
                     <p className="text-gray-800">{userData.age}</p>
                  )}
               </div>

               {/* Buttons */}
               {isEditing ? (
                  <>
                     <button
                        onClick={handleSaveClick}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                     >
                        Сохранить
                     </button>
                     <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                     >
                        Отмена
                     </button>
                  </>
               ) : (
                  <>
                     <button
                        onClick={handleEditClick}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                     >
                        Редактировать
                     </button>
                     <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                     >
                        Выйти
                     </button>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default Settings;
