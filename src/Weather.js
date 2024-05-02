import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button } from 'react-bootstrap';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = '7d9b4b63d5d81eec58bcb613f4401d4c';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric', // or 'imperial' for Fahrenheit
          },
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (city) {
      fetchData();
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger data fetching when the form is submitted
    if (city.trim()) {
      setWeatherData(null); // Clear previous data
      setCity(city.trim());
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Get Weather
            </Button>
          </Form>
          {weatherData && (
            <div>
              <h2>{weatherData.name}</h2>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Weather;