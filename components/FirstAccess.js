import React, { useState } from 'react';
import { StyleSheet, Text, View ,Image, Button } from 'react-native';


const FirstAccess = ({navigation}) => {


    const messages = [
        {title: "ciao!", content: "Benvenuto su APPLICAZIONE"},
        {title: "questa è un'applicazione utile", content: "APPLICAZIONE si usa così."},
        {title: "Piaciuto?", content: "Completa la registrazione e mettiti in gioco!"}
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
        <View style={styles.FirstAccess} key={index}>
            <Text>{index + 1}/{messages.length}</Text>
            <Text>{messages[index].title}</Text>
            <Text>{messages[index].content}</Text>
            <View style={styles.Buttons}>
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


    FirstAccess: {
        backgroundColor: "#d7f8ff",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },

    Visible: {
        display: 'flex'
    },

    Hidden: {
        display: "none"
    },

    Buttons:{
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})
