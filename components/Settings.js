import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, ScrollView, TextInput, Button, Pressable, TouchableOpacity} from 'react-native';


const Settings = () => {
    
    return(
        <View style={styles.container}>
            <ScrollView>

            <SettingTile/>

            <View style={styles.version}><Text>Versione 0.0.1</Text></View>

            </ScrollView>
        
        </View>
    )
}

export default Settings

const SettingTile = () => {
    return(
        <View>
            <View style={styles.settingTile}><Text>Dati Personali</Text></View>
            <View style={styles.settingTile}><Text>Info</Text></View>
            <View style={styles.settingTile}><Text>Segnala un problema</Text></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#e6e3e8'
    },

    settingTile: {
        width: '100%',
        height: 42,
        backgroundColor: '#edeaf0',
        borderBottomColor: '#d6d4d7',
        borderTopColor: '#d6d4d7',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 10    
    },

    version: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        bottom: 0,
    }

})