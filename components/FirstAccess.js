import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image /*ScrollView, TextInput*/, Button } from 'react-native';


const FirstAccess = () => {
    const [currentTabIndex] = useState(0)

    const messages = [
        {title: "ciao!", content: "Benvenuto su APPLICAZIONE"},
        {title: "", content: "APPLICAZIONE si usa così."},
        {title: "", content: "Piaciuto?"}
    ]
    
    let tabs = []

    for (let i = 0; i < messages.length; i++)
        tabs.push(Tab(messages[i].title, messages[i].content,i))

    return(
        <View> {tabs} </View>
    )
}

const Tab = (title, content, i) => {
    return(
        <View style={[styles.FirstAccess, (i === 0) ? styles.Visible : styles.Hidden]} key={i}>
            { <Text>{i}</Text> }
            <Text>{title}</Text>
            <Text>{content}</Text>
            <View style={styles.Buttons}>
                <Button title="Indietro" color="#666666" onPress={ } />
                <Button title="Avanti" onPress={ } />
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
