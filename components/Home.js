import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, ScrollView, Pressable, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({route, navigation}) => {

  const [firstAccess, setFirstAccess] = useState(true)
  const [photos, setPhotos] = useState(null)

  const getFA = async () => {
    try {
      return await AsyncStorage.getItem('firstAccess')
    } catch(e) {
      console.log('error: ',e)
      Alert.alert("C'è stato un problema")
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('photos')
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      if(value)
        setPhotos(value)
    } catch(e) {
      console.log('error: ',e)
      Alert.alert("C'è stato un problema")
    }
  }

  const displayFirstAccess = async () => {
      navigation.push('Subscription')
      navigation.push('FirstAccess')
  }

    useEffect(() => {
      const page = navigation.addListener('focus', () => {
        getData()
        // delData()
      });
      return page
    }, []);

    getFA().then((firstAccess) => {
      if(!firstAccess) {displayFirstAccess()}
    })

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
      tiles.push(new Tile(photos[i], i, navigation))

    tiles.push(
      <View key={'aux'} style={styles.auxTile}>
        
      </View>
    )
    
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

const Tile = (photo, key, navigation) => {
  // console.log(photo.uri)
  let formattedDate = GetDate(photo.date)
  if(photo !== null)
    return(
      <Pressable  key={key} style={({ pressed }) => [{ backgroundColor: pressed ? '#d9f7f7' : '#add8e6' }, styles.tile ]} onPress={() => {
        navigation.push('Details', photo)
      }}>
        <Text style={styles.textTile}>{formattedDate}</Text>
        <Image resizeMode='cover' style={styles.image} source={{uri: photo.uri}} />
      </Pressable>
    )

    return(<View key={key}></View>)
}

const GetDate = (dateTime) => {

  currentDate = new Date().toISOString()

  let splitDateTime = dateTime.split('T')
  
  //se la foto è stata scattata oggi, ritorno l'ora
  if(splitDateTime[0] === currentDate.split('T')[0])
    return("Oggi, " + splitDateTime[1].slice(0,5))

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
      // width: '100%',
      alignItems: 'center',
      // height: '100%'
    },

    tile: {
      // backgroundColor: '#add8e6',
      margin: 5,
      width:'97%',
      padding: 7,
      alignItems:'center',
      borderRadius: 8
    },

    textTile:{
      alignSelf: 'flex-end',
      marginRight:10,
      marginBottom: 5,
      marginTop: 5
    },

    auxTile: {
      width:'100%',
        height: 100
    },
  
    text: {
      fontSize: 16,
      margin:5
    },

    image: {
      width:'100%',
      height: 150,
      borderRadius: 8,
      margin: 2
    },

    bottomButtonView: {
        width:'100%',
        paddingTop: 5,
        paddingBottom: 5,
        padding: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        position:'absolute', 
        bottom:0,
        maxHeight:100
    },
  
    bottomButton: {
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
  });