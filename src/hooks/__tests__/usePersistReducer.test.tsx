import React from "react"
import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "test/testUtils";
import usePersistReducer, { UsePersistReducerReturnValueType } from "hooks/usePersistReducer";
import { initialState } from "store/reducer";

interface IHookWrapperProps {
  hook?: Function
}

function HookWrapper(props: IHookWrapperProps) {
  const hook: UsePersistReducerReturnValueType = props.hook ? props.hook() : undefined;
  return <div data-test="hook-wrapper" data-hook={hook}></div>;
}

const setUp = (props?: IHookWrapperProps): ShallowWrapper => {
  const wrapper = shallow(<HookWrapper {...props} />)
  return wrapper;
}

describe("usePersistReducer", () => {
  test("return correct initial value", () => {
    // setup
    const props = {
      hook: () => usePersistReducer()
    }
    const wrapper = setUp(props);
    const hookWrapper = findByTestAttr(wrapper, "hook-wrapper");
    const hook: UsePersistReducerReturnValueType = hookWrapper.prop("data-hook");
    const [
      state,
    ] = hook;

    // assertions / expectes
    expect(state).toEqual(initialState)
  });
});