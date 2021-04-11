import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, ScrollView, Button, Pressable, TouchableOpacity, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({route, navigation}) => {

  const [firstAccess, setFirstAccess] = useState(true); //useSetate è un hook a cui passo il valore iniziale
  const [photos, setPhotos] = useState(null)

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key')
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      if(value)
        setPhotos(value)
    } catch(e) {
      console.log(e)
      Alert.alert("C'è stato un problema")
    }
  }

  if(firstAccess !== true)
    useEffect(() =>{
      navigation.push('Subscription')
      navigation.push('FirstAccess')
    })

    useEffect(() => {
      const page = navigation.addListener('focus', () => {
        getData()
      });
      return page
    }, []);


  if(photos === null)
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
    const tiles = []

    // console.log(photos)
    
    for(let i = 0; i<photos.length;i++)
      tiles.push(new Tile(photos[i], i))
    
    return(
        <View style={styles.container}>

            <ScrollView contentContainerStyle={styles.contentContainer} >
              { tiles }
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

const Tile = (photo, key) => {
  // console.log(photo.uri)
  let formattedDate = GetDate(photo.date)
  if(photo !== null)
    return(
      <View key={key} style={styles.tile}>
        <Text style={styles.text}>{formattedDate}</Text>
        <Image style={styles.image} source={{uri: photo.uri}} />
      </View>
    )

    return(<View key={key}></View>)
}

const GetDate = (dateTime) => {

  currentDate = new Date().toISOString()

  let splitDateTime = dateTime.split('T')
  
  //se la foto è stata scattata oggi, ritorno l'ora
  if(splitDateTime[0] = currentDate.split('T')[0])
    return(splitDateTime[1].slice(0,5))

  let date = splitDateTime[0].split('-').reverse().join('.')
  return date
}


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
      padding: 0
    },

    tile: {
      backgroundColor: 'yellow',
      borderRadius: 10,
      aspectRatio: 5/3,
      margin: 5,
      padding: 5
    },
  
    text: {
      fontSize: 16,
      margin:5
    },

    image: {
      width:'100%',
      height: '90%',
      borderRadius: 8,
      margin: 2
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