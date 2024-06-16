import PhotoSVG from './PhotoSVG.tsx';
import DeleteSVG from './DeleteSVG.tsx';
import SortSvg from './SortSvg.tsx';

export const ICONS = {
  PhotoSVG,
  DeleteSVG,
  SortSvg,
};
export type IconTypes = keyof typeof ICONS;
