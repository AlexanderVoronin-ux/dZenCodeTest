import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {BottomTabNavigator} from './BottomTabNavigator';

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};
