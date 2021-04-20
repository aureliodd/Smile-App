import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React from 'react';
import { StyleSheet, Text, View , ScrollView, Pressable, Alert, DevSettings} from 'react-native';
import * as Linking from 'expo-linking'

import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({navigation}) => {

    const delPhotos = async () => {
        try {
          await AsyncStorage.removeItem('photos')
          DevSettings.reload()
        } catch(e) {
          console.log('error: ',e)
          Alert.alert("C'è stato un problema")
        }
      }

      const delUser = async () => {
        try {
          await AsyncStorage.removeItem('firstName')
          await AsyncStorage.removeItem('secondName')
          await AsyncStorage.removeItem('firstAccess')
          await AsyncStorage.removeItem('firstAccessPhoto')
          await AsyncStorage.removeItem('photos')
          DevSettings.reload()
        } catch(e) {
          console.log('error: ',e)
          Alert.alert("C'è stato un problema")
        }
      }
    
    return(
        <View style={styles.container}>
            <ScrollView>
            <View>
            <View style={styles.separator}></View>

            <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'gray' : 'white' }, styles.settingTile ]} onPress={() => { navigation.push('ChangeName') }}>
                <Text>Dati personali</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'gray' : 'white' }, styles.settingTile ]} onPress ={() => { navigation.push('Info') }}>
                <Text>Info</Text>
            </Pressable>
            <Pressable style={[{ backgroundColor: 'white' }, styles.settingTile]} onPress={() => Linking.openURL('mailto:a.durso@studium.unict.it')}>
                <Text>Segnala un problema</Text>
            </Pressable>

            <View style={styles.separator}></View>

            <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'gray' : 'white' }, styles.settingTile ]} onPress={() => {
                Alert.alert(
                    "Attenzione",
                    "Vuoi davvero eliminare tutte le foto?",
                    [
                      {
                        text: "No",
                        style: "cancel"
                      },
                      { text: "Sì", style:"destructive", onPress: () => delPhotos() }
                    ]
                  )
            }}
            >
                <Text style={styles.danger}>Elimina tutte le foto</Text>
            </Pressable>

            <View style={styles.separator}></View>

            <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'gray' : 'white' }, styles.settingTile ]} onPress={() => {
                Alert.alert(
                    "Attenzione",
                    "Uscendo eliminerai tutti i dati presenti. Sei sicuro di voler procedere?",
                    [
                      {
                        text: "No",
                        style: "cancel"
                      },
                      { text: "Sì", style:"destructive", onPress: () => delUser() }
                    ]
                  )
            }}
            >
                <Text style={styles.danger}>Esci</Text>
            </Pressable>
        </View>

            <View style={styles.version}><Text>Versione 0.1.0</Text></View>

            </ScrollView>
        
        </View>
    )
}

export default Settings


const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#f0eff4'
    },

    settingTile: {
        width: '100%',
        height: 42,
        borderBottomColor: '#d6d4d7',
        borderTopColor: '#d6d4d7',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 17
    },

    separator: {
        height: 25
    },

    version: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        bottom: 0,
        color: 'gray'
    },

    danger: {
        color: 'red'
    }
})