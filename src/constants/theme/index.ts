import {colors} from '../../../assets/colors';

export type Colors = {
  text: string;
  backgroundTabs: string;
  backgroundColor: string;
  backgroundMessageCtr: string;
};

export const lightModeColors: Colors = {
  text: colors.black,
  backgroundTabs: colors.blue,
  backgroundColor: colors.white,
  backgroundMessageCtr: colors.brown_1,
};

export const darkModeColors: Colors = {
  text: colors.white,
  backgroundTabs: colors.blue_3,
  backgroundColor: colors.blue_1,
  backgroundMessageCtr: colors.brown,
};
