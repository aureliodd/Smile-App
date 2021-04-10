import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import  { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../components/Home'
import Details from '../components/Details'
import Settings from '../components/Settings'

import Ionicons from '@expo/vector-icons/Ionicons'

const homeStack = createStackNavigator()
const settingsStack = createStackNavigator()

const tabs = createBottomTabNavigator()

const homeStackScreen = () => (
    <homeStack.Navigator
        initialRouteName="Home"
        screenOptions={{ gestureEnabled: false }}
    >
        <homeStack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home' }}
        />
        <homeStack.Screen
        name="Details"
        component={Details}
        initialParams={{ user: 'bello' }}
        />
    </homeStack.Navigator>
)

const settingsStackScreen = () => (
    <settingsStack.Navigator
        initialRouteName="Home"
        screenOptions={{ gestureEnabled: false }}
    >
        <settingsStack.Screen
        name="Settings"
        component={ Settings }
        options={{ title: 'Impostazioni' }}
        />
    </settingsStack.Navigator>
)

const MyTheme = {
    colors: {
      primary: 'blue',
      card: "#d7f8ff",
      text: 'blue'
    },
  };

function MainStack() {
    //IMPORTANTE: ricordare di Wrappare il Navigator nel NavigationContainer come sotto
    return (
            <tabs.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Settings') {
                    iconName = focused ? 'settings' : 'settings-outline';
                  }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}>
                <tabs.Screen name='Home' component={ homeStackScreen }  />
                <tabs.Screen name='Settings' component={ settingsStackScreen } />
            </tabs.Navigator>
    );
  }

  export default MainStack 
