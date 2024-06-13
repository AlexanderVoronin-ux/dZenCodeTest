import axios from 'axios';

export const fetchSunriseSunset = async (
  latitude: number,
  longitude: number,
) => {
  const apiKey = 'eee4ddafc10a32992e10855dd5cd51ec';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`;
  const response = await axios.get(url);
  const {sunrise, sunset} = response.data.sys;
  return {sunrise, sunset};
};
