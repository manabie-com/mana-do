import React from "react";
import { ReactWrapper, mount } from "enzyme";

import { findByTestAttr } from "test/testUtils";
import OutsideClickHandler, { IOutsideClickHandlerProps } from "..";

const setUp = (props?: IOutsideClickHandlerProps): ReactWrapper => {
 const wrapper = mount(<OutsideClickHandler {...props} />)
 return wrapper;
}

describe("<OutsideClickHandler /> rendering", () => {
  test("renders Outside Click Handler without errors", () => {
    const wrapper: ReactWrapper = setUp();
    const outsideClickHandler = findByTestAttr(wrapper, "outside-click-handler");
    expect(outsideClickHandler.length).toBe(1);
  })
})

describe("<OutsideClickHandler /> interactions", () => {
  let wrapper: ReactWrapper;
  let map: {[type: string]: any } = {};
  const props = {
    onClose: jest.fn(),
    children: <div>Test</div>,
    closeOnEscPress: true
  }
  beforeEach(() => {
    document.addEventListener = jest.fn((e, cb) => {
      map[e] = cb
    })
    wrapper = setUp(props);
  })
  test("call onClose function if clicked outside", () => {
    map.click({ event: { target: "" }})
    expect(props.onClose).toHaveBeenCalled()
  })
  test("call onClose Function when press Escape", () => {
    map.keydown({ key: "Escape" })
    expect(props.onClose).toHaveBeenCalled()
  })
})
