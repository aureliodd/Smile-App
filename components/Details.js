import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, ScrollView, Pressable} from 'react-native';


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
                    <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? 'pink' : 'red' }, styles.bottomButton ]} onPress={() => {}}>
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