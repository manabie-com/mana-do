import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { findByTestAttr } from "test/testUtils";
import ThemeSwitcher, { IThemeSwitcherProps } from "..";
import { ThemeType } from "models/theme";
import { toggleTheme } from "store/action-creators";
import { isDarkTheme } from "utils";

const setUp = (props: IThemeSwitcherProps): ShallowWrapper => {
 const wrapper = shallow(<ThemeSwitcher {...props} />)
 return wrapper;
}

describe("<ThemeSwitcher /> redering", () => {
  let wrapper: ShallowWrapper;
  const props = {
    theme: ThemeType.DARK,
    dispatch: jest.fn()
  }
  beforeEach(() => {
    wrapper = setUp(props);
  })
  test("renders Theme Switcher without errors", () => {
    const themeSwitcher = findByTestAttr(wrapper, "theme-switcher");
    expect(themeSwitcher.length).toBe(1);
  })
  test("renders correct Theme", () => {
    const themeSwitcher = findByTestAttr(wrapper, "theme-switcher");
    const expectedClassName = "root darkMode";
    expect(themeSwitcher.prop("className")).toBe(expectedClassName);
  })
})
describe("<ThemeSwitcher /> interactions", () => {
  let wrapper: ShallowWrapper;
  const props = {
    theme: ThemeType.DARK,
    dispatch: jest.fn()
  }
  beforeEach(() => {
    wrapper = setUp(props);
  })
  test("call onChange function when clicked Switcher", () => {
    const themeSwitcher = findByTestAttr(wrapper, "theme-switcher")
    themeSwitcher.simulate("click");
    expect(props.dispatch).toHaveBeenLastCalledWith(toggleTheme(isDarkTheme(props.theme) ? ThemeType.LIGHT : ThemeType.DARK));
  })
})