import {darkModeColors, lightModeColors} from '../constants/theme';
import {useSelector} from 'react-redux';
import {s_Theme} from '../store/selectors';

export const useTheme = () => {
  const colorTheme = useSelector(s_Theme);
  return colorTheme === 'dark' ? darkModeColors : lightModeColors;
};
