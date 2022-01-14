import { ReactWrapper, ShallowWrapper } from "enzyme";

export const findByTestAttr = (
  wrapper: ShallowWrapper | ReactWrapper, 
  val: string
): ShallowWrapper | ReactWrapper => {
  return wrapper.find(`[data-test="${val}"]`);
}