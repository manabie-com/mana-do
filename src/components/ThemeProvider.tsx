import React, { useState } from "react";

export type Theme = "darkgreen" | "blueviolet";

export type Props = {
  theme: Theme;
  switchTheme: (theme: Theme) => void;
};

export const ThemeContext = React.createContext<Props>({} as Props);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("darkgreen");

  const switchTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
