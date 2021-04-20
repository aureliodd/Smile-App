import React, { useState } from 'react';
import { StyleSheet, Text, View ,Image, Button } from 'react-native';


const FirstAccess = ({navigation}) => {


    const messages = [
        {title: "Ciao!", content: "Benvenuto su APPLICAZIONE."},
        {title: "APPLICAZIONE è la nuovissima app per FARE QUALCOSA", content: "Non ti basterà fare altro che premere su scatta foto."},
        {title: "Prima di cominciare", content: "Abbiamo bisogno che tu ti registri"}
    ]

    let tabs = []
    tabs  = Tab(messages, navigation)

    return(
        <View>{tabs}</View>
    )
}

const Tab = (messages, navigation) => {

    const [index, setIndex] = useState(0)

    return(
        <View style={styles.container} key={index}>
        <Text style={styles.pageIndicator}>{index + 1}/{messages.length}</Text>
            <View style={styles.textView}>
                <Text style={styles.title}>{messages[index].title}</Text>
                <Text style={styles.text}>{messages[index].content}</Text>
            </View>
            <View style={styles.buttonView}>
                <Button title="Indietro" disabled={(index === 0) ? true : false} color="#666666" onPress={ () => setIndex(index - 1) } />
                <Button title="Avanti" onPress={() => {
                    if(index <2) 
                        setIndex(index + 1)
                    else
                        navigation.navigate('Subscription')
                }} />
            </View>
        </View>
    )
}

export default FirstAccess

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#d7f8ff",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },

    textView: {
        justifyContent: "center",
        alignItems: "center",
        width: '90%',
        height:200,
        maxHeight: 200
    },

    pageIndicator: {
        color: 'gray',
        fontSize: 20,
        position: 'absolute',
        top: 40,
        left: 30
    },

    title:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    
    text: {
        fontSize: 16,
        color: '#a9a9a9'
    },

    buttonView:{
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})
