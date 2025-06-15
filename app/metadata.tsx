import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MetadataScreen() {
  const { photoUri } = useLocalSearchParams();

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  uri: { fontSize: 12, color: '#888', marginBottom: 8 },
  image: { width: 200, height: 200, backgroundColor: '#000', borderRadius: 12 },
});