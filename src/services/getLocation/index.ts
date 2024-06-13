import GetLocation from 'react-native-get-location';
import {useEffect, useState} from 'react';

interface ILocation {
  latitude: number;
  longitude: number;
}

export const getUserLocation = () => {
  const [location, setLocation] = useState<ILocation>({
    latitude: 50,
    longitude: 50,
  });

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setLocation(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  return {Lat: location.latitude, Lng: location.longitude};
};
