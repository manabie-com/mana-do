import { LayoutSpacing, SCALING_FACTOR } from "../constants/layouts.constants";

export const calcSpacing = (spacing: LayoutSpacing) => {
  return spacing ? `${spacing * SCALING_FACTOR}px` : undefined;
}

export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BreakPointMaxWidth = 'sm' | 'md' | 'lg' | 'xl';
export const calcBreakPoint = (breakpoint: BreakPoint) => {
  switch (breakpoint) {
    case 'xs':
      return '0px';
    case 'sm':
      return '600px';
    case 'md':
      return '960px';
    case 'lg':
      return '1280px';
    case 'xl':
      return '1920px';
    default:
      return '960px';
  }
}

export type FontSize = 'small' | 'medium' | 'big' | undefined
export const calcFontSize = (fontSize: FontSize) => {
  switch (fontSize) {
    case 'small':
      return '1rem';
    case 'medium':
      return '1.2rem';
    case 'big':
      return '2rem';
    default:
      return '1rem';
  }
}