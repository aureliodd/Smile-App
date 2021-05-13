import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const SubscriptionForm = ({ navigation }) => {

  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const setData = async (firstName, secondName) => {
    try {
      await AsyncStorage.setItem('firstName', firstName)
      await AsyncStorage.setItem('secondName', secondName)
      await AsyncStorage.setItem('email', email)
      await AsyncStorage.setItem('phone', phone)
      await AsyncStorage.setItem('firstAccess', 'false')
      await AsyncStorage.setItem('firstAccessPhoto', 'true')
    } catch (e) {
      console.log(e)
      Alert.alert("C'è stato un problema")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textView}><Text style={styles.registerText}>Dati personali</Text></View>
      <TextInput autoCorrect={false} style={styles.textInput} value={firstName} placeholder="nome" returnKeyType='done' onChangeText={(value) => setFirstName(value)} />
      <TextInput autoCorrect={false} style={styles.textInput} value={secondName} placeholder="cognome" returnKeyType='done' onChangeText={(value) => setSecondName(value)} />
      
      <View style={styles.separator}></View>

      <TextInput autoCorrect={false} style={styles.textInput} value={email} placeholder="(opzionale) email" keyboardType='email-address' returnKeyType='done' onChangeText={(value) => setEmail(value)} />
      <TextInput autoCorrect={false} style={styles.textInput} value={phone} placeholder="(opzionale) cellulare" keyboardType='numeric' returnKeyType='done' onChangeText={(value) => setPhone(value)} />

      <Pressable
        style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6495ED' }, styles.button]}
        onPress={() => {
          if (firstName === '' || secondName === '') return

          setData(firstName, secondName, email, phone)
          navigation.navigate('MainStack')
        }}>
        <Text style={styles.text}>Iscriviti e accedi all'app</Text>
      </Pressable>
    </View>
  )
}

export default SubscriptionForm


const styles = StyleSheet.create({

  container: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#d7f8ff',
    alignItems: 'center',
    paddingTop: 70
  },

  textView: {
    width: '90%',
    marginBottom: 7,
    paddingLeft: 5
  },

  registerText: {
    fontSize: 30,
  },

  text: {
    fontSize: 16
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
    color: 'gray',
    paddingLeft: 15,
    backgroundColor: 'white'
  },

  separator: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'gray',
    width:'90%'
  },
});