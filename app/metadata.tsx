import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as Location from 'expo-location';

export default function MetadataScreen() {
  const { photoUri } = useLocalSearchParams();
  const [weather, setWeather] = useState('');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [dateTime, setDateTime] = useState<string>(() => {
    const now = new Date();
    return now.toLocaleString();
  });
  const [description, setDescription] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Location permission denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  console.log('Alınan photoUri:', photoUri);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Storm Metadata</Text>
      <Text style={styles.uri}>{photoUri ? String(photoUri) : 'No URI'}</Text>
      <Image
        source={photoUri ? { uri: String(photoUri) } : undefined}
        style={styles.image}
        onError={e => {
          console.log('Image yüklenemedi:', e.nativeEvent.error);
        }}
      />

      {/* Weather Condition alanı */}
      <Text style={styles.label}>Weather Condition</Text>
      <View style={styles.pickerContainer}>
        <TouchableOpacity onPress={() => setWeather('Sunny')}>
          <Text style={[styles.pickerOption, weather === 'Sunny' && styles.selected]}>Sunny</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setWeather('Rainy')}>
          <Text style={[styles.pickerOption, weather === 'Rainy' && styles.selected]}>Rainy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setWeather('Stormy')}>
          <Text style={[styles.pickerOption, weather === 'Stormy' && styles.selected]}>Stormy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setWeather('Snowy')}>
          <Text style={[styles.pickerOption, weather === 'Snowy' && styles.selected]}>Snowy</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.selectedValue}>Selected: {weather}</Text>

      {/* Location alanı */}
      <Text style={styles.label}>Location</Text>
      <Text style={styles.location}>
        {location
          ? `Latitude: ${location.latitude}\nLongitude: ${location.longitude}`
          : 'Getting location...'}
      </Text>

      {/* Date & Time alanı */}
      <Text style={styles.label}>Date & Time</Text>
      <Text style={styles.dateTime}>{dateTime}</Text>

      {/* Description / Notes alanı */}
      <Text style={styles.label}>Description / Notes</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter a description or notes..."
        value={description}
        onChangeText={setDescription}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  uri: { fontSize: 12, color: '#888', marginBottom: 8 },
  image: { width: 200, height: 200, backgroundColor: '#000', borderRadius: 12 },
  label: { fontWeight: 'bold', marginTop: 24, marginBottom: 8, fontSize: 16 },
  pickerContainer: { flexDirection: 'row', marginBottom: 8 },
  pickerOption: {
    padding: 8,
    marginHorizontal: 4,
    backgroundColor: '#eee',
    borderRadius: 6,
    color: '#333',
  },
  dateTime: { color: '#333', marginBottom: 8, textAlign: 'center' },
  selected: {
    backgroundColor: '#0077b6',
    color: '#fff',
  },
  textInput: {
    width: '80%',
    minHeight: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  selectedValue: { marginBottom: 8, color: '#444' },
  location: { color: '#333', marginBottom: 8, textAlign: 'center' },
});