import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function WeatherScreen() {
  // State to store weather data
  const [weather, setWeather] = useState<any>(null);

  // State to track loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function runs when the component mounts
    const fetchWeather = async () => {
      try {
        // Ask for location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Location permission was not granted.');
          setLoading(false);
          return;
        }

        

        // Get current GPS location
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        console.log("Latitude:", latitude, "Longitude:", longitude);
        <Text style={styles.text}>📍 Location: {latitude}, {longitude}</Text>



        // Call Open-Meteo API to get weather data
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=43.6461&longitude=-79.3916&current=temperature_2m,wind_speed_10m,precipitation
`
        );

        // Store weather data in state
        setWeather(response.data.current);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch weather data.');
      } finally {
        // Hide loading indicator
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  // Show "not found" message if no data is available
  if (!weather) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Weather data not found.</Text>
      </View>
    );
  }

  // Show weather information
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🌡️ Temperature: {weather.temperature_2m}°C</Text>
      <Text style={styles.text}>💨 Wind Speed: {weather.wind_speed_10m} km/h</Text>
      <Text style={styles.text}>🌧️ Precipitation: {weather.precipitation} mm</Text>
    </View>
  );
}

// Basic styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001d3d',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
