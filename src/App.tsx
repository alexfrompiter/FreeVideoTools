/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigationScreen from './screens/MainNavigationScreen';
import {NativeBaseProvider} from 'native-base';

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MainNavigationScreen />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
