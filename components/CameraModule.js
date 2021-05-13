import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons'

const CameraModule = ({ navigation }) => {

  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState('off')
  const [flashIcon, setFLashIcon] = React.useState('flash-off-outline')

  let camera

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Non è possibile accedere alla camera</Text>;
  }

  const takePicture = async () => {

    if (camera) {
      const options = {
        quality: 1,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      const photo = await camera.takePictureAsync(options)
      console.log(new Date().toISOString())
      console.log(new Date().toString())

      navigation.navigate('PhotoPreview', { uri: photo.uri, date: new Date().toISOString() })
    }
  }

  const handleFlash = () => {
    if (flashMode === 'on') {
      setFlashMode('auto')
      setFLashIcon('flash')
    }
    else if (flashMode === 'off') {
      setFlashMode('on')
      setFLashIcon('flash-outline')
    }
    else {
      setFlashMode('off')
      setFLashIcon('flash-off-outline')
    }
  }

  const checkCameraFirstAccess = async () => {
    try {
      const firstAccessPhoto = await AsyncStorage.getItem('firstAccessPhoto')
      if (firstAccessPhoto == 'true')
        Alert.alert(
          "Nota",
          "Assicurarsi che la foto sia scattata nelle migliori condizioni possibili ",
          [
            {
              text: "Ho capito",
              onPress: () => AsyncStorage.setItem('firstAccessPhoto', 'false'),
              style: "cancel"
            }
          ]
        )
    } catch (e) {
      console.log('error: ', e)
      Alert.alert("C'è stato un problema")
    }
  }

  checkCameraFirstAccess()



  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Camera style={styles.camera} type={type} flashMode={flashMode} ref={ref => { camera = ref }}>{/*NOTA: ref è importantissimo per far funzionare takePicture*/}
        <View style={styles.buttonTopContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleFlash}
          >
            <Ionicons name={flashIcon} size={32} color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.pop()
            }}>
            <Ionicons name='close-outline' size={32} color='white' />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBottomContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { }}>
            <Ionicons name='images-outline' size={32} color='white' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoButton} onPress={takePicture}>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
              );
            }}>
            <Ionicons name='sync-outline' size={32} color='white' />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default CameraModule


const styles = StyleSheet.create({

  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  buttonTopContainer: {
    position: 'absolute',
    display: 'flex',
    top: 0,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: 20
  },

  buttonBottomContainer: {
    position: 'absolute',
    display: 'flex',
    bottom: 0,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: 20
  },

  camera: {
    flex: 1,
  },

  button: {
    alignSelf: 'flex-end',
  },

  photoButton: {
    height: 55,
    width: 55,
    borderRadius: 100,
    backgroundColor: 'white'
  },

  text: {
    fontSize: 18,
    color: 'white',
  },
});