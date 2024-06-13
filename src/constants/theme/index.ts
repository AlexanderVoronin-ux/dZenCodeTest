import {colors} from '../../../assets/colors';

type Colors = {
  text: string;
  backgroundTabs: string;
};

export const lightModeColors: Colors = {
  text: colors.black,
  backgroundTabs: colors.blue,
};

export const darkModeColors: Colors = {
  text: colors.white,
  backgroundTabs: colors.blue_3,
};
