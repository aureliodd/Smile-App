import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import  { NavigationContainer } from '@react-navigation/native'
import FirstAccess from '../components/FirstAccess';
import MainStack from './mainStack';
import SecondaryStack from './secondaryStack';
import SubscriptionForm from '../components/SubscriptionForm';
import CameraModule from '../components/CameraModule';
import PhotoPreview from '../components/PhotoPreview';

const rootStack = createStackNavigator()

function RootStack() {
    //IMPORTANTE: ricordare di Wrappare il Navigator nel NavigationContainer come sotto
    return (
        <NavigationContainer>
            <rootStack.Navigator headerMode="none" initialRouteName="Home" screenOptions={{ gestureEnabled: false }}>
                <rootStack.Screen name='MainStack' component={ MainStack } />
                <rootStack.Screen name='SecondaryStack' component={ SecondaryStack } />
                <rootStack.Screen name='FirstAccess' component={ FirstAccess } />
                <rootStack.Screen name='Subscription' component={ SubscriptionForm } />
                <rootStack.Screen name="CameraModule" component={CameraModule} />
                <rootStack.Screen name="PhotoPreview" component={PhotoPreview} />
            </rootStack.Navigator>
        </NavigationContainer>
    );
  }

  export default RootStack 