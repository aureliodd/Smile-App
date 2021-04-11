import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, ScrollView, Button, Pressable, TouchableOpacity} from 'react-native';
import { PostData } from '../network/Http';

import AsyncStorage from '@react-native-async-storage/async-storage';


const PhotoForm = ({route, navigation}) => {


    return(
      <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.contentContainer} >
        <View style={styles.tile}>
          <Image style={styles.image} source={{uri: route.params.uri}}></Image>
        </View>
        <View style={styles.tile}>
          <Text>ciao</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomButtonView}>
          <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6495ED' }, styles.bottomButton ]} onPress={() => {
            PostData(route.params.uri)

            setObjectValue = async () => {
              try {
                // const jsonValue = JSON.stringify(route.params)
                // await AsyncStorage.mergeItem('key', jsonValue)

                let value = []

                const jsonGet = await AsyncStorage.getItem('key')
                if(jsonGet !== null)
                  value = JSON.parse(jsonGet)
                
                
                value.push(route.params)

                console.log(value)

                const jsonValue = JSON.stringify(value)
                await AsyncStorage.setItem('key', jsonValue)


              } catch(e) {
                console.log('errore')
              }
              console.log('Done.')
            }

          setObjectValue()
          
            navigation.navigate('Home')
          }}>
              <Text style={styles.text}>Analizza</Text>
          </Pressable>
      </View>
  </View>
    )
}

export default PhotoForm

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
  },

  contentContainer: {
    padding: 5
  },

  tile: {
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

  image: {
    width: '50%',
    aspectRatio: 3/4
},
});