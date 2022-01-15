import React from "react";
import clsx from "clsx";

import styles from "./ThemeSwitcher.module.scss";
import { ThemeType } from "models/theme";

export interface IThemeSwitcherProps {
  className?: string,
  theme?: ThemeType.LIGHT | ThemeType.DARK,
  onChange?: Function 
}

const ThemeSwitcher = (props: IThemeSwitcherProps) => {
  const { className, theme, onChange } = props;

  const handleChangeTheme = () => {
    if (onChange) onChange()
  }
  return (
    <div 
      className={clsx(
        styles.root, 
        className && className,
        theme === ThemeType.DARK && styles.darkMode
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