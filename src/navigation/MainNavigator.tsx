import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {BottomTabNavigator} from './BottomTabNavigator';
import {getUserLocation} from '../services/getLocation';
import {fetchSunriseSunset} from '../services/fetchSunriseSunset';
import {isDaytime} from '../services/getDaytime';
import {useDispatch} from 'react-redux';
import {setTheme} from '../store/reducers';
import {useNetInfo} from '@react-native-community/netinfo';
import {setAppConnection} from '../store/reducers';
import {permissionsForGeolocation} from '../services/permissions';

export const MainNavigator = () => {
  const dispatch = useDispatch();
  const {isConnected} = useNetInfo();
  const {Lat, Lng} = getUserLocation();

  // setTheme for app
  useEffect(() => {
    const loadDaytimeStatus = async () => {
      try {
        const {sunrise, sunset} = await fetchSunriseSunset(Lat, Lng);
        const isDay = isDaytime(sunrise, sunset);
        dispatch(setTheme(isDay ? 'light' : 'dark'));
      } catch (error) {
        console.error('Error fetching location or weather data:', error);
      }
    };

    loadDaytimeStatus().then();

    permissionsForGeolocation().then();

    dispatch(setAppConnection(!!isConnected));
  }, []);

  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};
