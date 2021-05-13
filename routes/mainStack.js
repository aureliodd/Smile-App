import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../components/Home'
import Details from '../components/Details'
import Settings from '../components/Settings'
import ChangeName from '../components/settingsMenus/PersonalData'
import Info from '../components/settingsMenus/Info'

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
        options={{ title: 'Dettagli' }}
        />
    </homeStack.Navigator>
)

const settingsStackScreen = () => (
    <settingsStack.Navigator
        initialRouteName="Settings"
        screenOptions={{ gestureEnabled: false }}
    >
        <settingsStack.Screen
        name="Settings"
        component={ Settings }
        options={{ title: 'Impostazioni' }}
        />

        <settingsStack.Screen
        name="ChangeName"
        component={ ChangeName }
        options={{ title: 'Dati personali' }}
        />

        <settingsStack.Screen
        name="Info"
        component={ Info }
        options={{ title: 'Info' }}
        />
    </settingsStack.Navigator>
)

function MainStack() {
    return (
      <tabs.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Impostazioni') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // Posso tornare un componente qualsiasi qui:
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
          <tabs.Screen name='Home' component={ homeStackScreen }  />
          <tabs.Screen name='Impostazioni' component={ settingsStackScreen } />
      </tabs.Navigator>
    );
  }

  export default MainStack 
