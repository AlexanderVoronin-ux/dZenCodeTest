import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';

import {BottomTabScreen} from './constants';
import {AddPostScreen, HomeScreen, ProfileScreen} from '../screens';
import {colors} from '../../assets/colors';
import {fonts} from '../constants/fonts';
import {useTheme} from '../hooks/useTheme.ts';

export type BottomTabParamList = {
  HomeScreen: undefined;
  AddPostScreen: {replyTo: string} | undefined;
  ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenListeners={({navigation}) => {
        return {
          tabPress: () => {
            navigation.setParams({replyTo: null});
          },
        };
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: theme.backgroundTabs,
          backgroundColor: theme.backgroundTabs,
        },
        tabBarActiveTintColor: colors.brown_1,
        tabBarInactiveTintColor: colors.white,
        tabBarHideOnKeyboard: true,
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
          title: 'AddPost',
          tabBarLabelStyle: {
            fontFamily: fonts.nunitoBlack,
            fontSize: 15,
          },
          unmountOnBlur: true,
          tabBarIcon: () => (
            <Image
              source={require('../constants/svgIcons/icons/plusGif.gif')}
              style={{width: 80, height: 60}}
            />
          ),
          tabBarIconStyle: {paddingBottom: 35},
        }}
        name={BottomTabScreen.AddPostScreen}
        component={AddPostScreen}
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
