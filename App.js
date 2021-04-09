//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, Button, ScrollView, TextInput, Pressable } from 'react-native';
import FirstAccess from './components/FirstAccess'
import Home from './components/Home'
import Subscription from './components/Subscription'

export default function App() {
  const [firstAccess, setFirstAccess] = useState(true); //uSestate è un hook a cui passo il valore iniziale

  if(firstAccess !== true)
    return(
      <View style={styles.container}>
        <FirstAccess  />
        <Subscription />
        <Home />
      </View>
    )   
  else 
    return (
    <View>
      <Home />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //invece di height e width
  },

  text: {
    fontSize: 16
  },

  button: {
    textAlign:'center',
    width: '90%',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8
  },

  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    width: '90%',
    textAlign:'center',
    color: 'gray'
  }
});