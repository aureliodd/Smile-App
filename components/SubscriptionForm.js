import React, { useState } from 'react';
import { StyleSheet, Text, View ,Image, TextInput, Pressable } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const SubscriptionForm = ({navigation}) => {

    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')

    const setData = async (firstName, secondName) => {
      try {
        await AsyncStorage.setItem('firstName',firstName)
        await AsyncStorage.setItem('secondName',secondName)
        await AsyncStorage.setItem('firstAccess','false')
      } catch(e) {
        console.log(e)
        Alert.alert("C'è stato un problema")
      }
    }

    return(
        <View style={ styles.container }>
          <View style={ styles.textView }><Text style={ styles.registerText }>Registrazione</Text></View>
          <TextInput autoCorrect={ false } style={styles.textInput} value={firstName} placeholder="nome" onChangeText={(value) => setFirstName(value)} />
          <TextInput autoCorrect={ false } style={styles.textInput} value={secondName} placeholder="cognome" onChangeText={(value) => setSecondName(value)} />
          
          <Pressable 
              // disabled={() => {
              //     if(firstName === '' || secondName === '') return true; else return false}
              // } 
              style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6495ED' }, styles.button ]} 
              onPress={() => {
                if(firstName === '' || secondName === '') return
                
                setData(firstName, secondName)
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
    justifyContent: 'center',
  },

  textView:{
    width: '90%',
    marginBottom: 7,
    paddingLeft: 5
  },

  registerText:{
    fontSize: 30,
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
  }
  });