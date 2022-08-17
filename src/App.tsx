/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {FirstScreen} from './pages/mainScreen';
import {SecondScreen} from './pages/secondScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home"  component={FirstScreen} />
        <Stack.Screen name="User" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
