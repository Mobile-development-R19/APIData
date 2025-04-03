import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FoodSearch from './FoodSearch';
import FoodDetails from './FoodDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FoodSearch" component={FoodSearch} />
        <Stack.Screen name="FoodDetails" component={FoodDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
