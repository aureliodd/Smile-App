import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, ScrollView, Button, Pressable, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';


const Home = ({navigation}) => {

  const [firstAccess, setFirstAccess] = useState(true); //useSetate è un hook a cui passo il valore iniziale
  const [photos, setPhotos] = useState([])

  if(firstAccess === true)
    useEffect(() =>{
      navigation.push('Subscription')
      navigation.push('FirstAccess')
    })


  if(photos.length === 0)
    return(    
      <View style={styles.emptyContainer}>
                <Text>Qui verranno mostrate le tue foto</Text>
            <View style={styles.bottomButtonView}>
                <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6495ED' }, styles.bottomButton ]} onPress={() => navigation.push('CameraModule')}>
                    <Text style={styles.text}>Scatta una foto</Text>
                </Pressable>
            </View>
        </View>
    )
    
    return(
        <View style={styles.container}>

            <ScrollView contentContainerStyle={styles.contentContainer} >
              <View style={styles.tile}>
                <Text>ciao</Text>
              </View>
              <View style={styles.tile}>
                <Text>ciao</Text>
              </View>
            </ScrollView>

            <View style={styles.bottomButtonView}>
                <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6495ED' }, styles.bottomButton ]} onPress={() => navigation.push('CameraModule')}>
                    <Text style={styles.text}>Scatta una foto</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      height: '100%',
      flex: 1,
    },

    emptyContainer: {
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },

    contentContainer: {
      padding: 5
    },

    tile: {
      backgroundColor: 'brown',
      borderRadius: 10,
      aspectRatio: 5/3,      
    },
  
    text: {
      fontSize: 16
    },

    bottomButtonView: {
        width:'100%',
        paddingTop: 5,
        paddingBottom: 5,
        padding: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        position:'absolute', bottom:0
    },
  
    bottomButton: {
      textAlign:'center',
      alignItems: 'center',
      padding: 14,
      borderRadius: 8,
      
    },

    Visible:{
        display: 'flex'
    },

    Hidden: {
        display: 'none'
    },    
  });