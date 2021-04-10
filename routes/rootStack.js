import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import  { NavigationContainer } from '@react-navigation/native'
import FirstAccess from '../components/FirstAccess';
import MainStack from './mainStack';
import Subscription from '../components/Subscription';
import CameraModule from '../components/CameraModule';
import PhotoPreview from '../components/PhotoPreview';

const rootStack = createStackNavigator()

function RootStack() {
    //IMPORTANTE: ricordare di Wrappare il Navigator nel NavigationContainer come sotto
    return (
        <NavigationContainer>
            <rootStack.Navigator mode="modal" headerMode="none" 
        initialRouteName="Home"
        screenOptions={{ gestureEnabled: false }}>
                <rootStack.Screen name='MainStack' component={ MainStack } />
                <rootStack.Screen name='FirstAccess' component={ FirstAccess } />
                <rootStack.Screen name='Subscription' component={ Subscription } />
                <rootStack.Screen name="CameraModule" component={CameraModule} initialParams={{ user: '' }} />
                <rootStack.Screen name="PhotoPreview" component={PhotoPreview} initialParams={{ user: '' }} />
            </rootStack.Navigator>
        </NavigationContainer>
    );
  }

  export default RootStack 