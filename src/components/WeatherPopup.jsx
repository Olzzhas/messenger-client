import React, { useState } from 'react';
import axios from 'axios'; // Предполагается, что вы будете использовать axios для HTTP-запросов

const WeatherPopup = ({ onClose }) => {
   const [city, setCity] = useState('');
   const [weatherData, setWeatherData] = useState(null);

   const getWeatherData = async () => {
      try {
         const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=74b1193ea2d2d80f6f4b22378bf8905e`,
         );
         setWeatherData(response.data);
      } catch (error) {
         console.error('Error fetching weather data:', error);
      }
   };

   return (
      <div className="weather-popup">
         <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
         />
         <button onClick={getWeatherData}>Get Weather</button>

         {/* Отображение данных о погоде */}
         {weatherData && (
            <div>
               <h2>{weatherData.name}</h2>
               <p>Temperature: {weatherData.main.temp}</p>
               {/* Другие данные о погоде */}
            </div>
         )}

         <button onClick={onClose}>Close</button>
      </div>
   );
};

export default WeatherPopup;
