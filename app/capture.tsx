import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import  Camera  from 'expo-camera'; 

export default function CaptureScreen() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>🚫 Camera is not supported on web.</Text>
      </View>
    );
  }

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(() => {
    try {
      return Camera.Constants.Type.back;
    } catch {
      return 0;
    }
  });

  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>No access to camera</Text>
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('📸 Photo URI:', photo.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef} />
      <View style={styles.controls}>
        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001d3d',
  },
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
