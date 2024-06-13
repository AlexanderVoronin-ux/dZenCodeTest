import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabScreen} from './constants';
import {AddToDoScreen, HomeScreen, ProfileScreen} from '../screens';
import {colors} from '../../assets/colors';
import {Image} from 'react-native';
import {fonts} from '../constants/fonts';
import {useTheme} from '../hooks/useTheme.ts';

export type BottomTabParamList = {
  HomeScreen: undefined;
  AddToDoScreen: undefined;
  ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: theme.backgroundTabs,
          backgroundColor: theme.backgroundTabs,
        },
        tabBarActiveTintColor: colors.brown_1,
        tabBarInactiveTintColor: colors.white,
      }}>
      <Tab.Screen
        options={{
          title: 'Home',
          tabBarLabelStyle: {
            fontFamily: fonts.nunitoBlack,
            fontSize: 15,
          },
          tabBarIcon: () => (
            <Image
              source={require('../constants/svgIcons/icons/homeGif.gif')}
              style={{width: 30, height: 25}}
            />
          ),
        }}
        name={BottomTabScreen.HomeScreen}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: 'AddToDo',
          tabBarLabelStyle: {
            fontFamily: fonts.nunitoBlack,
            fontSize: 15,
          },
          tabBarIcon: () => (
            <Image
              source={require('../constants/svgIcons/icons/plusGif.gif')}
              style={{width: 80, height: 60}}
            />
          ),
          tabBarIconStyle: {paddingBottom: 35},
        }}
        name={BottomTabScreen.AddToDoScreen}
        component={AddToDoScreen}
      />
      <Tab.Screen
        options={{
          title: 'Profile',
          tabBarLabelStyle: {
            fontFamily: fonts.nunitoBlack,
            fontSize: 15,
          },
          tabBarIcon: () => (
            <Image
              source={require('../constants/svgIcons/icons/profileGif.gif')}
              style={{width: 30, height: 25}}
            />
          ),
        }}
        name={BottomTabScreen.ProfileScreen}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
