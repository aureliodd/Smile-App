import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, Alert, Switch, TextInput } from 'react-native';
import { PostData } from '../network/Http'

import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const delPhoto = async (uri) => {
  try {
    const jsonValue = await AsyncStorage.getItem('photos')
    const value = JSON.parse(jsonValue)


    let indexToRemove = value.indexOf(value.find((element) => {
      return (element.uri === uri)
    }))

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


const Details = ({ route, navigation }) => {

  const form = new Form(route.params.sentToMedicalCenter, route.params.moreInfo)

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image resizeMode='cover' style={styles.image} source={{ uri: route.params.uri }} />
        <View style={styles.body}>
          <View style={styles.dateDelete}>
            <View style={styles.info}>
              <Text><Text style={styles.textTitle}>Aggiunta il:</Text><Text> {formatDate(route.params.date)}</Text></Text>
            </View>
            <Pressable style={styles.delImage} onPress={() => {
              Alert.alert(
                "Attenzione",
                "Vuoi davvero eliminare la foto?",
                [
                  { text: "No", style: "cancel" },
                  {
                    text: "Sì", style: "destructive", onPress: () => {
                      delPhoto(route.params.uri)
                      navigation.navigate('Home')
                    }
                  }
                ]
              )
            }}>
              <Ionicons name='trash-outline' size={32} color='red' />
            </Pressable>
          </View>

          <View style={styles.tile}>
            <Text><Text style={styles.textTitle}>Risultato: </Text><Text style={styles.text}>{route.params.result.resultName}</Text></Text>
            <Text style={styles.text}>{route.params.result.resultDescription}</Text>
          </View>

          <View style={styles.separator}></View>

          {form}

        </View>
      </ScrollView>
    </View>
  )
}

function Form(sent, info) {

  const [isEnabled, setIsEnabled] = useState(false);
  const [moreInfo, setMoreInfo] = useState('');

  if (sent)
    return (
      <View style={styles.tile}>
        <Text style={styles.textTitle}>Questa foto è stata inviata ad un cento medico.</Text>
        <Text style={styles.textSubTitle}>Sono state incluse le seguenti informazioni:</Text>
        <Text style={styles.text}>{info}</Text>

        <View style={styles.blankTile}></View>
      </View>
    )
  else
    return (
      <View>
        <View style={styles.tile}>
          <View style={styles.modal}>
            <Text style={styles.text}>Invia al centro medico</Text>
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
            onChangeText={(value) => { setMoreInfo(value); console.log(moreInfo); }}
          />
          <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6495ED' }, styles.button, { display: (isEnabled) ? 'flex' : 'none' }]}
            onPress={() => {
              PostData()
            }}>
            <Text style={styles.text}>Invia</Text>
          </Pressable>
        </View>
        <View style={styles.blankTile}></View>
      </View>
    )
}

function formatDate(isoDate) {
  let aux = isoDate.split("T")
  let date = aux[0].split('-').reverse().join('.')
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
    // width: '100%',
    alignItems: 'center',
    // height: '100%'
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
    paddingRight: 8
  },

  // delImage: {
  //   right: 3,
  //   top: 3
  // },

  info: {
    margin: 10
  },

  textTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16
  },

  textSubTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'gray'
  },

  text: {
    fontSize: 16
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
    color: 'gray'
  },

  tile: {
    padding: 15,
    top: 10,
    width: '100%',
    borderRadius: 8,
  },

  modal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
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


  blankTile: {
    height: 300
  },
})