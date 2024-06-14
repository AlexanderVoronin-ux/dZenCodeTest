import {colors} from '../../../assets/colors';

type Colors = {
  text: string;
  backgroundTabs: string;
  backgroundColor: string;
};

export const lightModeColors: Colors = {
  text: colors.black,
  backgroundTabs: colors.blue,
  backgroundColor: colors.white,
};

export const darkModeColors: Colors = {
  text: colors.white,
  backgroundTabs: colors.blue_3,
  backgroundColor: colors.blue_1,
};
