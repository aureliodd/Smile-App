import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PhotoForm from '../components/PhotoForm'

const secondaryStack = createStackNavigator()

{/* <rootStack.Screen name="PhotoForm" component={PhotoForm} initialParams={{ user: '' }} /> */}

function SecondaryStack() {
    return (
      <secondaryStack.Navigator screenOptions={{ gestureEnabled: false }} >
        <secondaryStack.Screen name='PhotoForm' component={ PhotoForm } options={{ title: 'Inviaa' }} />
      </secondaryStack.Navigator>
    );
  }

  export default SecondaryStack 
