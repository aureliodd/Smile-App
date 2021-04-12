import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, ScrollView, TextInput, Button, Pressable, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
    
    return(
        <View style={styles.container}>
            <ScrollView>

            <SettingTiles/>

            <View style={styles.version}><Text>Versione 0.0.1</Text></View>

            </ScrollView>
        
        </View>
    )
}

export default Settings

const SettingTiles = () => {

    const delPhotos = async () => {
        try {
          await AsyncStorage.removeItem('photos')
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
        } catch(e) {
          console.log('error: ',e)
          Alert.alert("C'è stato un problema")
        }
      }

    return(
        <View>
            <View style={styles.separator}></View>

            <View style={styles.settingTile}><Text>Dati Personali</Text></View>
            <View style={styles.settingTile}><Text>Info</Text></View>
            <View style={styles.settingTile}><Text>Segnala un problema</Text></View>

            <View style={styles.separator}></View>

            <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'gray' : 'white' }, styles.settingTile ]} onPress={() => {
                delPhotos()
            }}
            >
                <Text style={styles.danger}>Elimina tutte le foto</Text>
            </Pressable>

            <View style={styles.separator}></View>

            <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'gray' : 'white' }, styles.settingTile ]} onPress={() => {
                delPhotos()
                delUser()
            }}
            >
                <Text style={styles.danger}>Esci</Text>
            </Pressable>
        </View>
    )
}

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