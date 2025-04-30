import React, { useState } from 'react';
import './App.css'; 


const WeatherApp = () => {
   const [city, setCity] = useState('');
   const [weather, setWeather] = useState(null);
   const [error, setError] = useState('');
 
   const getWeather = async () => {
     if (!city.trim()) {
       setWeather(null);
       setError('Zəhmət olmasa şəhər adı daxil edin.');
       return;
     }
 
     try {
       const res = await fetch(
         `https://api.weatherapi.com/v1/current.json?key=7b1eaf6efd804a44b87101529222212&q=${city}&aqi=no`
       );
 
       if (!res.ok) {
         throw new Error('Şəhər tapılmadı');
       }
 
       const data = await res.json();
 
       if (data.error) {
         setWeather(null);
         setError('Şəhər tapılmadı. Zəhmət olmasa düzgün yazın.');
       } else {
         setWeather(data);
         setError('');
       }
     } catch (err) {
       setWeather(null);
       setError('Məlumat tapılmadı. Zəhmət olmasa düzgün şəhər adı daxil edin.');
     }
   };
 
   return (
     <div className="container">
       <div className="weather-box">
         <div className="input-group">
           <input
             type="text"
             placeholder="Şəhər adı..."
             value={city}
             onChange={(e) => setCity(e.target.value)}
           />
           <button onClick={getWeather}>Get Forecast</button>
         </div>
 
         {error && <p className="error">{error}</p>}
 
         {weather && (
           <div className="weather-info">
             <h2>{weather.location.name}, {weather.location.country}</h2>
             <img src={weather.current.condition.icon} alt="weather icon" />
             <p>{weather.current.condition.text}</p>
             <p>{weather.current.temp_c}°C / {weather.current.temp_f}°F</p>
             <p>Wind: {weather.current.wind_mph} MPH</p>
             <p>Visibility: {weather.current.vis_km} KM</p>
             <p>Humidity: {weather.current.humidity}%</p>
           </div>
         )}
       </div>
     </div>
   );
 };

export default WeatherApp
