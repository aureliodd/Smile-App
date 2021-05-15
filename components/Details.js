import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, Alert, Switch, TextInput, ActivityIndicator } from 'react-native';
import { PostData } from '../network/Http'

import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const getPhoneEmail = async (setPhone, setEmail) => {
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

const delPhoto = async (indexToRemove) => {
  try {
    const jsonValue = await AsyncStorage.getItem('photos')
    const value = JSON.parse(jsonValue)

    value.splice(indexToRemove, 1) //1 è il numero di elementi da rimuovere a partire da indexToRemove

    if (value.length === 0)
      await AsyncStorage.removeItem('photos')
    else
      await AsyncStorage.setItem('photos', JSON.stringify(value))

  } catch (e) {
    console.log('error: ', e)
    Alert.alert("C'è stato un problema")
  }
}

const updatePhoto = async (indexToUpdate, moreInfo) => {

  try {
    const photos = await AsyncStorage.getItem('photos')
    const photosArray = JSON.parse(photos)

    photosArray[indexToUpdate].sentToMedicalCenter = true
    photosArray[indexToUpdate].moreInfo = moreInfo

    const jsonValue = JSON.stringify(photosArray)
    await AsyncStorage.setItem('photos', jsonValue)

  } catch (e) {
    Alert.alert("C'è stato un problema")
    console.log('error: ', e)
  }
}


const Details = ({ route, navigation }) => {

  const [loading, setLoading] = useState(false)

  const [gravityColor, setGravityColor] = useState('black')

  useEffect(() => {

    switch (route.params.photo.result.resultGravity) {
      case 0: setGravityColor('green'); break;
      case 1: setGravityColor('orange'); break;
      case 2: setGravityColor('red'); break;
      default: setGravityColor('black'); break;
    }
  });

  return (
    <View style={styles.container}>

      <View style={[styles.loading, { display: loading ? 'flex' : 'none' }]}>
        <ActivityIndicator size="large" />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image resizeMode='cover' style={styles.image} source={{ uri: route.params.photo.uri }} />
        <View style={styles.body}>
          <View style={styles.dateDelete}>
            <View style={styles.info}>
              <Text><Text style={styles.textTitle}>Aggiunta il:</Text><Text> {formatDate(route.params.photo.date)}</Text></Text>
            </View>
            <Pressable onPress={() => {
              Alert.alert(
                "Attenzione",
                "Vuoi davvero eliminare la foto?",
                [
                  { text: "No", style: "cancel" },
                  { text: "Sì", style: "destructive", onPress: async () => { await delPhoto(route.params.key); navigation.navigate('Home') } }
                ]
              )
            }}>
              <Ionicons name='trash-outline' size={32} color='red' />
            </Pressable>
          </View>

          <View style={styles.tile}>
            <Text style={styles.textTitle}><Text>Risultato: </Text><Text style={{ color: gravityColor }}>{route.params.photo.result.resultName}</Text></Text>
            <Text style={[styles.text, styles.justify]}>{route.params.photo.result.resultDescription}</Text>
          </View>

          <View style={styles.separator}></View>

          <Form uri={route.params.photo.uri} sent={route.params.photo.sentToMedicalCenter} info={route.params.photo.moreInfo} index={route.params.key} setLoading={setLoading} />


          <View style={styles.blankTile}></View>

        </View>
      </ScrollView>
    </View>
  )
}

function Form(props) {

  const [isEnabled, setIsEnabled] = useState(false);
  const [moreInfo, setMoreInfo] = useState('');

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [sent, setSent] = useState(false)

  getPhoneEmail(setPhone, setEmail)

  if (props.sent)
    return (
      <View style={styles.tile}>
        <View style={styles.ioniconText}>
          <Ionicons name='medical' size={32} color='red' />
          <Text style={styles.textTitle}>Questa foto è stata inviata ad un centro medico.</Text>
        </View>
        <Text style={styles.textSubTitle}>Sono state incluse le seguenti informazioni:</Text>
        <Text style={[styles.text, styles.justify]}>{props.info ? props.info : '-'}</Text>
        <Text style={styles.textSpace}>Verrete ricontattati al più presto ai recapiti forniti al momento dell'invio.</Text>
      </View>
    )
  else if (phone === '' && email === '')
    return (
      <View style={styles.tile}>
        <View style={styles.notAvailable}>
          <Text>Vuoi saperne di più? Fornisci email o telefono nelle impostazioni per poter contattare il centro medico</Text>
        </View>
      </View>
    )

  return (
    <View>
      <View style={[{ display: !sent ? 'flex' : 'none' }, styles.tile]}>
        <Text style={styles.textTitle}>Vuoi saperne di più?</Text>
        <View style={styles.modal}>
          <View style={styles.textIonicon}>
            <Ionicons name='medical' size={24} color='red' />
            <Text style={styles.text}>  Invia al centro medico</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#32CD32" }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsEnabled(previousState => !previousState)}
            value={isEnabled}
          />
        </View>

        <TextInput
          style={[styles.infoInput, { display: (isEnabled) ? 'flex' : 'none' }]}
          multiline
          numberOfLines={4}
          placeholder='Inserisci informazioni utili'
          value={moreInfo}
          onChangeText={(value) => { setMoreInfo(value) }}
        />
        <Pressable
          style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6495ED' }, styles.button, { display: (isEnabled) ? 'flex' : 'none' }]}
          onPress={() => {

            props.setLoading(true)

            updatePhoto(props.index, moreInfo)

            PostData(props.uri, moreInfo)
            props.setLoading(false)

            setSent(true)
          }}>
          <Text style={styles.text}>Invia</Text>
        </Pressable>
      </View>

      <View style={[{ display: sent ? 'flex' : 'none' }, styles.tile]}>
        <Text style={styles.textDone}><Ionicons name="checkmark-circle-outline" size={32} color='green' />Fatto!</Text>
        <Text style={styles.textSubTitle}>Informazioni:</Text>
        <Text style={[styles.text, styles.justify]}>{moreInfo ? moreInfo : '-'}</Text>
        <Text style={styles.textSpace}>Verrete ricontattati al più presto ai recapiti forniti.</Text>
      </View>
    </View>
  )
}

function formatDate(dateTime) {
  let aux = dateTime.split(", ")
  let date = aux[0].split('/').join('.')
  let time = aux[1].slice(0, 5)

  return (date + ' alle ' + time)
}

export default Details

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
  },

  contentContainer: {
    alignItems: 'center'
  },


  image: {
    width: '100%',
    height: 200,
  },

  body: {
    width: '100%'
  },

  dateDelete: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingRight: 15,
    paddingLeft: 15
  },

  info: {
    marginTop: 10
  },

  textTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },

  textDone: {
    fontWeight: 'bold',
    fontSize: 32,
  },

  textSubTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'gray'
  },

  textSpace: {
    marginTop: 10
  },

  text: {
    fontSize: 16
  },

  justify: {
    textAlign: 'justify',
  },

  ioniconText: {
    flexDirection: 'row',
  },



  button: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    marginTop: 20
  },

  separator: {
    marginTop: 10,
    borderWidth: 1,
    color: 'gray',
    marginLeft: 7,
    marginRight: 7
  },

  tile: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
    borderRadius: 8,
  },

  modal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },

  textIonicon: {
    flexDirection: 'row',
    alignItems: 'center'
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

  notAvailable: {
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1
  },

  blankTile: {
    height: 300
  },

  loading: {
    flex:1,
    position:'absolute',
    backgroundColor: 'rgba(0,0,0,0.9)',
    zIndex: 1,
    width: '100%',
    height: '100%',
    justifyContent:'center'
  }
})