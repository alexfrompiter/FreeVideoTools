import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ConvertScreen from './ConvertScreen/ConvertScreen';
import AboutScreen from './AboutScreen';
import LastItemsScreen from './LastItemsScreen';

const Drawer = createDrawerNavigator();

const MainNavigationScreen: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Convert">
      <Drawer.Screen name="Convert" component={ConvertScreen} />
      <Drawer.Screen name="LastItems" component={LastItemsScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
};
export default MainNavigationScreen;
