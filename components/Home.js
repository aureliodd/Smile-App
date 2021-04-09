import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, ScrollView, TextInput, Button, Pressable, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';


const Home = () => {
    
    return(
        <View style={styles.container}>
            <View style={styles.statusBar}>
                <Text style={styles.text}>Applicazione</Text>
            </View>

            <ScrollView >
                <Text>Qui verranno mostrate le tue foto</Text>
            </ScrollView>

            <CameraModule style={styles.Hidden} />

            <View style={styles.bottomButton}>
                <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6495ED' }, styles.button ]} onPress={() => console.log("ciao")}>
                    <Text style={styles.text}>Scatta una foto</Text>
                </Pressable>
            </View>
        </View>
    )
}





const CameraModule = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

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
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {

    if (camera) {
        const options = {
          quality: 1,
          base64: true
        };
        const photo = await camera.takePictureAsync(options);
        console.log(photo);
    }
  };

  

  return (
    <View style={styles.cmr}> 
      <Camera style={styles.camera} type={type} ref={ref => {camera = ref}}>{/*NOTA: ref è importantissimo per far funzionare takePicture*/}
        <View style={styles.buttonTopContainer}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => { console.log("esciii miii")
            }}>
            <Text style={styles.text}> X </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBottomContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Gira </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoButton} onPress={takePicture}>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );

}


export default Home

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    },

    statusBar:{
        paddingTop: 30,
        height: 60,
        width: '100%',
        backgroundColor:'orange'
    },
  
    text: {
      fontSize: 16
    },

    bottomButton: {
        width:'100%',
        padding: 2
    },
  
    button: {
      textAlign:'center',
      alignItems: 'center',
      padding: 14,
      borderRadius: 8
    },

    Visible:{
        display: 'flex'
    },

    Hidden: {
        display: 'none'
    },
  
    textInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      width: '90%',
      textAlign:'center',
      color: 'gray'
    },

    /* */
    cmr: {
        flexDirection: 'column',
        position:"absolute",
        width: "100%",
        display:"flex",
        height: "100%",
        justifyContent: 'space-between'
      },

      buttonTopContainer: {
          backgroundColor: 'blue'
      },

      buttonBottomContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        backgroundColor:'red',
      },

      camera: {
        flex: 1,
      },

      button: {
        flex: 0.1,
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