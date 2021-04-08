//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, Button, ScrollView, TextInput, Pressable } from 'react-native';
import FirstAccess from './components/FirstAccess'
import Cameras from './components/Cameras'
import { Camera } from 'expo-camera';

export default function App() {
  const [firstAccess] = useState(true); //uSestate è un hook a cui passo il valore iniziale

  if(firstAccess === true)
    return <FirstAccess />
  else
    return (

    //return <Cameras />

      <ScrollView>
        <View style={styles.container}>
          <Text>Benvenuto, mbare</Text>
          <TextInput style={styles.textInput} defaultValue="nome" />
          <TextInput style={styles.textInput} defaultValue="cognome" />
          
          <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6495ED' }, styles.button ]} onPress={() => {return <Cameras />}}>
            <Text style={styles.text}>Scatta una foto</Text>
          </Pressable>
          
        </View>
      </ScrollView>
      
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70
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