import React from "react";
import { useAppContext } from "../../AppContext";
import { Themes } from "../../models/todo";
import { setTheme } from "../../store/actions";
import { Wrapper } from "./styles";

const ThemeButton = () => {
  const {
    state: { theme },
    dispatch,
  } = useAppContext();

  const toggleTheme = () => {
    if (theme === Themes.Light) {
      dispatch(setTheme(Themes.Dark));
    } else {
      dispatch(setTheme(Themes.Light));
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTheme(e.target.checked ? Themes.Light : Themes.Dark));
  };

  return (
    <Wrapper onClick={toggleTheme}>
      <input id="toggle" className="toggle" type="checkbox" checked={theme === Themes.Dark} onChange={onChange} />
      <label htmlFor="toggle" className="title">
        Toggle dark mode
      </label>
    </Wrapper>
  );
};

export default ThemeButton;
