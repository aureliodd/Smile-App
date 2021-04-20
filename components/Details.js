import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React from 'react';
import { StyleSheet, Text, View ,Image, ScrollView, Pressable, Alert, DevSettings, SliderComponent} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const delPhoto = async (uri) => {
  try {
    const jsonValue = await AsyncStorage.getItem('photos')
    const value = JSON.parse(jsonValue)


    let indexToRemove = value.indexOf(value.find((element) => {
      return (element.uri === uri)
    }))

    value.splice(indexToRemove, 1) //1 è il numero di elementi da rimuovere a partire da indexToRemove

    if(value.length === 0)
      await AsyncStorage.removeItem('photos')
    else
      await AsyncStorage.setItem('photos', JSON.stringify(value))

    } catch(e) {
    console.log('error: ',e)
    Alert.alert("C'è stato un problema")
  }
}


const Details = ({route, navigation}) => {
    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={ styles.contentContainer }>
                <Image resizeMode='cover' style={styles.image} source={{uri: route.params.uri}} />
                <View style={styles.infoDelete}>
                    <View style={styles.info}>
                        <Text><Text style={styles.textTitle}>Aggiunta il:</Text><Text> { formatDate(route.params.date) }</Text></Text>
                        <Text style={styles.textTitle}>Dettagli aggiuntivi: </Text><Text> - </Text>
                        <Text style={styles.textTitle}>Esito: </Text><Text> - </Text>
                    </View>
                    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'pink' : 'red' }, styles.bottomButton ]} onPress={ async () => {
                      await delPhoto(route.params.uri)
                      navigation.navigate('Home')
                    }}>
                        <Text style={styles.text}>Elimina</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

function formatDate(isoDate){
    let aux = isoDate.split("T")
    let date = aux[0].split('-').reverse().join('.')
    let time = aux[1].slice(0,5)

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
        width:'100%',
        height: 200,
      },

      infoDelete: {
        width: '100%'
      },

      info: {
        margin: 10
      },

      textTitle: {
        fontWeight: 'bold',
        marginTop: 10
      },

      bottomButton: {
        textAlign:'center',
        alignItems: 'center',
        padding: 14,
        borderRadius: 8
      },
})