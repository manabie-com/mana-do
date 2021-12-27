import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { shallow } from 'enzyme';
import TodoItem, {Props} from "../src/components/TodoItem";
import {Todo} from '../src/models/todo'

describe("<TodoItem />", () => {
  test("TodoItem should display", async () => {
    const wrapper = shallow(<TodoItem />);
    expect(wrapper).toMatchSnapshot();
  });
});