import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FoodSearch from './FoodSearch';
import FoodDetails from './FoodDetails';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Etusivu'>
        <Stack.Screen name="Etusivu" component={HomeScreen} />
        <Stack.Screen name="Haku" component={FoodSearch} />
        <Stack.Screen name="Ravintotiedot" component={FoodDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
