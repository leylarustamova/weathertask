import React, { useState } from 'react';
import './App.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setWeatherData(null);
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=7b1eaf6efd804a44b87101529222212&q=${city}&aqi=no`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();

      if (data.error) {
        setWeatherData(null);
        setError('City not found. Please check the spelling.');
      } else {
        setWeatherData(data);
        setError('');
        setCity('');
      }
    } catch (err) {
      setWeatherData(null);
      setError('Could not fetch data. Please enter a valid city name.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div className="container">
      <h1 className="title">Weather Forecast</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weatherData && !loading && (
        <div className="weather-card">
          <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
          <img src={weatherData.current.condition.icon} alt="weather icon" />
          <p className="condition">{weatherData.current.condition.text}</p>
          <p className="temp">{weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F</p>
          <p>Wind: {weatherData.current.wind_mph} MPH</p>
          <p>Visibility: {weatherData.current.vis_km} KM</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;


