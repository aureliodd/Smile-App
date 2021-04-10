import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, ScrollView, TextInput, Button, Pressable, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';


const Details = (props) => {
    console.log(props.route.params.user)
    return(
        <View><Text>Madonna se funziona {props.user}</Text></View>
    )
}

export default Details