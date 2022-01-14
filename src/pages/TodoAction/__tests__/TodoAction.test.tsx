import React from "react";

import { shallow } from "enzyme";
import TodoAction from "..";
import { TodoStatus } from "../../../constants/todo";

const todoStatusProvider = [
  [
    {
      description:
        "button action ACTIVE will have class active when status filter is ACTIVE",
      status: TodoStatus.ACTIVE,
    },
  ],
  [
    {
      description:
        "button action COMPLETED will have class active when status filter is COMPLETED",
      status: TodoStatus.COMPLETED,
    },
  ],
  [
    {
      description:
        "button action ALL will have class active when status filter is ALL",
      status: TodoStatus.ALL,
    },
  ],
];

describe.each(todoStatusProvider)(
  "Test render class active button",
  ({ status, description }) => {
    let component: any;

    beforeEach(() => {
      component = shallow(
        <TodoAction
          statusActive={status}
          onToggleAllTodo={() => null}
          setStatusFilter={() => null}
          onDeleteAllTodo={() => null}
        />
      );
    });

    it(description, () => {
      expect(
        component
          .find('[data-test="' + status + '"]')
          .hasClass("toolbar__tabs--active")
      ).toEqual(true);
    });
  }
);
