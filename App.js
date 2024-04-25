import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Linking, BackHandler } from 'react-native';
import { Camera } from 'expo-camera';
import * as Animatable from 'react-native-animatable';

const window = Dimensions.get('window');

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (showCamera) {
        setShowCamera(false);
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [showCamera]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(`Tipo: ${type}, Datos: ${data}`);

    if (data.startsWith('http')) {
      Linking.openURL(data);
    } else {
      console.log(`Contenido del código QR: ${data}`);
    }

    // Reiniciar el estado de 'scanned' después de manejar el escaneo
    setTimeout(() => setScanned(false), 3000); // Reiniciar después de 3 segundos (puedes ajustar este valor)
  };

  const activateCamera = () => {
    setShowCamera(true);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      {!showCamera && (
        <TouchableOpacity style={styles.button} onPress={activateCamera}>
          <Text style={styles.buttonText}>Activar cámara</Text>
        </TouchableOpacity>
      )}
      {showCamera && (
        <Animatable.View
          animation="fadeIn"
          duration={1000}
          style={styles.cameraContainer}
        >
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            <View style={styles.rectangleContainer}>
              <View style={styles.rectangle} />
            </View>
          </Camera>
        </Animatable.View>
      )}
      {scanned && <Text style={styles.scanText}>Escaneado exitosamente</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  cameraContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: 300,
    width: 300,
    borderWidth: 2,
    borderColor: '#1f1',
    backgroundColor: 'transparent',
  },
  scanText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});
