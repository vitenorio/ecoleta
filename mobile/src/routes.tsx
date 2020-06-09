import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screens/Home/HomeScreen'
import PointsScreen from './screens/Points/PointsScreen'
import DetailScreen from './screens/Detail/DetailScreen'

const AppStack = createStackNavigator()

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode='none'
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5',
          },
        }}
      >
        <AppStack.Screen name='Home' component={HomeScreen} />
        <AppStack.Screen name='Points' component={PointsScreen} />
        <AppStack.Screen name='Detail' component={DetailScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes