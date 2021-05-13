import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Pressable, Alert, StatusBar, Switch } from 'react-native';
import { PostData } from '../network/Http';

import { analizePhoto } from '../application/analizePhoto'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext } from 'react';


const PhotoForm = ({ route, navigation }) => {

  const [resultName, setResultName] = useState('');
  const [resultDescription, setResultDescription] = useState('');
  const [resultGravity, setResultGravity] = useState('');
  const [gravityColor, setGravityColor] = useState('')

  const [isEnabled, setIsEnabled] = useState(false);
  const [moreInfo, setMoreInfo] = useState('');

  useEffect(() => {
    const page = navigation.addListener('focus', () => {
      let result = analizePhoto(route.params.uri)
      setResultName(result.name)
      setResultDescription(result.description)
      setResultGravity(result.gravity)

      return page
    }, []);

    switch (resultGravity) {
      case 0: setGravityColor('green'); break;
      case 1: setGravityColor('orange'); break;
      case 2: setGravityColor('red'); break;
      default: setGravityColor('black'); break;
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden={false}></StatusBar>
      <ScrollView contentContainerStyle={styles.contentContainer} >

        <Image resizeMode='cover' style={styles.image} source={{ uri: route.params.uri }} />

        <View style={styles.tile}>
          <Text style={styles.resultText}>Risultato:</Text>
          <View>
            <Text style={[{ color: gravityColor }, styles.resultText]}>{resultName}</Text>
            <Text style={styles.text}>{resultDescription}</Text>
          </View>
        </View>

        <Form isEnabled={isEnabled} setIsEnabled={setIsEnabled} moreInfo={moreInfo} setMoreInfo={setMoreInfo}/>

        <View style={styles.blankTile}></View>

      </ScrollView>

      <View style={styles.bottomButtonView}>
        <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6495ED' }, styles.bottomButton]} onPress={() => {

          if (isEnabled)
            PostData(route.params, moreInfo)

          const setPhotos = async () => {
            let photo = route.params
            photo.result = { resultName: resultName, resultDescription: resultDescription, resultGravity: resultGravity }
            photo.sentToMedicalCenter = isEnabled

            if (isEnabled)
              photo.moreInfo = moreInfo

            try {
              let aux = []

              const jsonGet = await AsyncStorage.getItem('photos')
              if (jsonGet !== null)
                aux = JSON.parse(jsonGet)

              aux.push(route.params)

              const jsonValue = JSON.stringify(aux)
              await AsyncStorage.setItem('photos', jsonValue)

            } catch (e) {
              Alert.alert("C'è stato un problema")
              console.log('errore')
            }
          }

          setPhotos()

          navigation.navigate('Home', route.params)
        }}>
          <Text style={styles.text}>Torna alla Home</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default PhotoForm

function Form(props) {

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const getPhoneEmail = async () => {
    try {
      const phone = await AsyncStorage.getItem('phone')
      const email = await AsyncStorage.getItem('email')
      if (phone !== null)
        setPhone(phone)
      if (email !== null)
        setEmail(email)

    } catch (e) {
      console.log('error: ', e)
      Alert.alert("C'è stato un problema")
    }
  }

  getPhoneEmail()

  // console.log(phone, email)

  if (phone === '' && email === '')
    return (
      <View style={[styles.tile, styles.notAvailable]}>
        <Text>Vuoi saperne di più? Fornisci email o telefono nelle impostazioni per poter contattare il centro medico</Text>
      </View>
    )
  else
    return (
      <View style={styles.tile}>
        <View style={styles.modal}>
          <Text style={styles.text}>Invia al centro medico</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#32CD32" }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => props.setIsEnabled(previousState => !previousState)}
            value={props.isEnabled}
          />
        </View>

        <TextInput
          style={[styles.infoInput, { display: (props.isEnabled) ? 'flex' : 'none' }]}
          multiline
          numberOfLines={4}
          placeholder='Inserisci informazioni utili'
          value={props.moreInfo}
          onChangeText={(value) => { props.setMoreInfo(value) }}
        />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
  },

  contentContainer: {
    alignItems: 'center',
    padding: 5
  },

  tile: {
    padding: 15,
    top: 10,
    width: '100%',
    borderRadius: 8,
  },

  blankTile: {
    height: 300
  },

  notAvailable: {
    borderColor: 'gray',
    borderWidth: 1
  },

  infoInput: {
    top: 15,
    width: '100%',
    height: 100,
    maxHeight: 100,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8
  },

  modal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },

  resultText: {
    fontSize: 20,
    fontWeight: '900'
  },

  text: {
    fontSize: 16
  },

  bottomButtonView: {
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    padding: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    position: 'absolute', bottom: 0
  },

  bottomButton: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,

  },

  image: {
    width: '100%',
    borderRadius: 8,
    aspectRatio: 5 / 3
  },
});