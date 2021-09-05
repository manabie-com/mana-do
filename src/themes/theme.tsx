import { DefaultTheme } from "styled-components";
import colors from "./colors";

const theme: DefaultTheme = {
  palette: {
    primary: {
      main: colors.primary.main,
      light: colors.primary.light[1],
      dark: colors.primary.dark[1],
      contrastText: colors.white,
    },
    error: {
      main: colors.red[0],
      light: colors.red[5],
      dark: colors.red[7],
      contrastText: colors.white,
    },
  },
  borderRadius: "8px",
  colors,

  // ===FONT SIZE===
  fontSize: {
    xSmall: "12px",
    small: "14px",
    normal: "16px",
    medium: "18px",
    xMedium: "22px",
    large: "25px",
    xLarge: "28px",
    xxLarge: "35px",
  },

  // ===FONT WEIGHT===
  fontWeight: {
    light: 300,
    normal: 400,
    semi: 600,
    bold: 700,
  },

  // ===TRANSITION DEFAULT===
  transitionDefault: "all 200ms ease-in-out",

  // ===BOX SHADOW DEFAULT===
  boxShadowDefault: "rgba(235,241,249,1) 0 0 0 3px",
};

export default theme;
