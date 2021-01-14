import { LayoutSpacing, SCALING_FACTOR } from "../constants/layouts.constants";

export const calcSpacing = (spacing: LayoutSpacing) => {
  return spacing ? `${spacing * SCALING_FACTOR}px` : undefined;
}