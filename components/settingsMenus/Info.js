import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Info = () => {

    return(
        <View style={ styles.container }>
              <Text style={styles.headerText}>Smile</Text>
              <Text style={styles.text}>Applicazione sviluppata da</Text>
              <Text style={styles.text}>Alfio Aurelio D'Urso</Text>
              <Text style={styles.bottomText}>Università degli studi di Catania</Text>
        </View>
    )
}

export default Info

const styles = StyleSheet.create({

  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText:{
    fontWeight:'bold',
    fontSize:30,
    marginBottom: 10
  },

  bottomText:{
    marginTop: 20,
    color:'gray'
  },
  
  text: {
    fontSize: 20
  },
  });