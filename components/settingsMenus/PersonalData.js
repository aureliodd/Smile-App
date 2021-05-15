import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const ChangeName = ({ navigation }) => {

  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')


  useEffect(() => {
    const page = navigation.addListener('focus', () => {
      getData()
    });
    return page
  }, []);



  const getData = async () => {
    try {
      let fName = await AsyncStorage.getItem('firstName')
      let sName = await AsyncStorage.getItem('secondName')
      let e = await AsyncStorage.getItem('email')
      let p = await AsyncStorage.getItem('phone')
      setFirstName(fName)
      setSecondName(sName)
      setEmail(e)
      setPhone(p)
    } catch (e) {
      console.log(e)
      Alert.alert("C'è stato un problema")
    }
  }

  const setData = async (firstName, secondName, e, p) => {
    try {
      await AsyncStorage.setItem('firstName', firstName)
      await AsyncStorage.setItem('secondName', secondName)

      if(e != null)
        await AsyncStorage.setItem('email', e)
      else
        await AsyncStorage.removeItem('email')

      if(p != null)
        await AsyncStorage.setItem('phone', p)
      else
        await AsyncStorage.removeItem('phone')


    } catch (e) {
      console.log(e)
      Alert.alert("C'è stato un problema")
    }
  }

  return (
    <View style={styles.container}>
      <TextInput autoCorrect={false} style={styles.textInput} value={firstName} placeholder="nome" returnKeyType='done' onChangeText={(value) => setFirstName(value)} />
      <TextInput autoCorrect={false} style={styles.textInput} value={secondName} placeholder="cognome" returnKeyType='done' onChangeText={(value) => setSecondName(value)} />

      <TextInput autoCorrect={false} style={styles.textInput} value={email} placeholder="(opzionale) email" keyboardType='email-address' returnKeyType='done' onChangeText={(value) => setEmail(value)} />
      <TextInput autoCorrect={false} style={styles.textInput} value={phone} placeholder="(opzionale) cellulare" keyboardType='numeric' returnKeyType='done' onChangeText={(value) => setPhone(value)} />


      <Pressable
        style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6495ED' }, styles.button]}
        onPress={() => {
          if (firstName === '' || secondName === '') return

          setData(firstName, secondName, email, phone)
          navigation.pop()
        }}>
        <Text style={styles.text}>Fatto</Text>
      </Pressable>
    </View>
  )
}

export default ChangeName


const styles = StyleSheet.create({

  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    top: 20
  },

  textView: {
    width: '90%',
    marginBottom: 7,
    paddingLeft: 5
  },

  text: {
    fontSize: 16,
  },

  button: {
    textAlign: 'center',
    width: '90%',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8
  },

  Pressed: {
    backgroundColor: '#6495ED'
  },

  NotPressed: {
    backgroundColor: 'rgb(210, 230, 255)'
  },

  textInput: {
    margin: 2,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    width: '90%',
    color: 'black',
    paddingLeft: 15,
    backgroundColor: 'white'
  }
});