import React from 'react';

import { shallow } from 'enzyme';
import TodoItemContent from '../';
import { findByTestAttribute } from '../../../../../test/testUtils';

const testRenderInputProvider = [
  [
    {
      description: 'Will render input edit if is editing',
      isEditing: true,
    },
  ],
  [
    {
      description: 'Will not render input edit if is not editing',
      isEditing: false,
    },
  ],
];

describe.each(testRenderInputProvider)(
  'Test render input edit',
  ({ description, isEditing }) => {
    let component: any;

    beforeEach(() => {
      component = shallow(
        <TodoItemContent
          inputRef={null}
          todoContent="something"
          onChangeTodo={() => null}
          onPressEnter={() => null}
          isEditing={isEditing}
        />
      );
    });

    test(description, () => {
      expect(findByTestAttribute(component, 'todo-edit').exists()).toEqual(
        isEditing
      );
    });
  }
);
