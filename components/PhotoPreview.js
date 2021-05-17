
import React from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';

const PhotoPreview = ({ route, navigation }) => {
    
    return (
        <View style={styles.container}>
            <Image resizeMode='contain' style={styles.image} source={{ uri: route.params.uri }}></Image>
            <View style={styles.buttonContainer}>
                <Button title="Cancella" color="white" onPress={() => navigation.pop()} />
                <Button title="Analizza" color="white" onPress={() => navigation.navigate('SecondaryStack', { screen: 'PhotoForm', params: { uri: route.params.uri, date: route.params.date } },)} />
            </View>
        </View>
    )
}

export default PhotoPreview
const styles = StyleSheet.create({

    container: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: 'black',
        flexDirection: 'column',
        justifyContent: 'space-around',
        display: 'flex'
    },

    image: {
        width: '100%',
        height: '100%'
    },

    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        padding: 15,
    },
})