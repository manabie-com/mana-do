import React from "react";
import clsx from "clsx";

import styles from "./ThemeSwitcher.module.scss";

import { Theme, ThemeType } from "models/theme";
import { toggleTheme } from "store/action-creators";
import { isDarkTheme } from "utils";

export interface IThemeSwitcherProps {
  className?: string,
  theme?: Theme,
  dispatch: Function 
}

const ThemeSwitcher = (props: IThemeSwitcherProps) => {
  const { className, theme = ThemeType.LIGHT, dispatch } = props;

  const handleChangeTheme = () => {
    dispatch(toggleTheme(isDarkTheme(theme) ? ThemeType.LIGHT : ThemeType.DARK))
  }
  
  return (
    <div 
      className={clsx(
        styles.root, 
        className && className,
        isDarkTheme(theme) && styles.darkMode
      )} 
      onClick={handleChangeTheme}
      data-test="theme-switcher"
    >
      <div className={styles.toggle}></div>
      <div className={styles.modes}>
        <p className={styles.light}>Light</p>
        <p className={styles.dark}>Dark</p>
      </div>
    </div>
  )
}

export default ThemeSwitcher