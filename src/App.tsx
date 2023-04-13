/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigationScreen from './screens/MainNavigationScreen';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <MainNavigationScreen />
    </NavigationContainer>
  );
}

export default App;
