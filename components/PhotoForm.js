import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, ScrollView, TextInput, Pressable, Alert, StatusBar, Switch} from 'react-native';
import { PostData } from '../network/Http';

import AsyncStorage from '@react-native-async-storage/async-storage';


const PhotoForm = ({route, navigation}) => {

  const [isEnabled, setIsEnabled] = useState(false);
  const [moreInfo, setMoreInfo] = useState('');

    return(
      <View style={styles.container}>
      <StatusBar hidden={false}></StatusBar>
      <ScrollView contentContainerStyle={styles.contentContainer} >
        
          <Image resizeMode='cover' style={styles.image} source={{uri: route.params.uri}} />

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
            style={[styles.infoInput, {display: (isEnabled) ? 'flex' : 'none'}]} 
            multiline 
            numberOfLines={4} 
            placeholder='Entra informazioni utili'
            value={moreInfo}
            onChangeText={(value) => {setMoreInfo(value); console.log(moreInfo);}}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomButtonView}>
          <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6495ED' }, styles.bottomButton ]} onPress={() => {
            
            if(isEnabled)
              PostData(route.params, moreInfo)

            setPhotos = async () => {
              try {
                let aux = []

                const jsonGet = await AsyncStorage.getItem('photos')
                if(jsonGet !== null)
                  aux = JSON.parse(jsonGet)
                
                aux.push(route.params)

                const jsonValue = JSON.stringify(aux)
                await AsyncStorage.setItem('photos', jsonValue)

              } catch(e) {
                Alert.alert("C'è stato un problema")
                console.log('errore')
              }
            }

            setPhotos()
          
            navigation.navigate('Details', route.params)
          }}>
              <Text style={styles.text}>Analizza</Text>
          </Pressable>
      </View>
  </View>
    )
}

export default PhotoForm

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
    width:'100%',
    borderRadius: 8,
    aspectRatio: 5/3,
  },

  infoInput: {
    top: 15,
    width:'100%',
    height: 100,
    maxHeight: 100,
    borderColor:'black',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8
  },

  modal:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width: '100%'
  },

  text: {
    fontSize: 16
  },

  bottomButtonView: {
      width:'100%',
      paddingTop: 5,
      paddingBottom: 5,
      padding: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      position:'absolute', bottom:0
  },

  bottomButton: {
    textAlign:'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    
  },

  image: {
    width: '100%',
    borderRadius:8,
    aspectRatio: 5/3
},
});