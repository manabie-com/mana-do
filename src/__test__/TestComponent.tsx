import React from "react";
import { Todo } from "../models/todo";
import { AppActions, setTodos } from "../store/actions/todoActions";
import { TodoContext } from "../store/contexts/todoContext";

export interface TestComponentProps extends React.HTMLAttributes<HTMLElement> {
  preData?: Todo[];
  action: AppActions;
}

// The purpose of this component is to test wheter the todo reducers is modifying
// Context state correctly.

// Todos context state output being rendered which is JSON string.

// The "components.test.tsx" test suite will query the "screen" and "expect" 
// the ouput based on the context state rendered in this component.
const TestComponent: React.FunctionComponent<TestComponentProps> = ({
  preData,
  action,
}) => {
  const [{ todos }, dispatch] = React.useContext(TodoContext);

  React.useEffect(() => {
    if (preData) {
      dispatch(setTodos(preData));
    }
    dispatch(action);
  }, [action, dispatch, preData]);

  return (
    <div>
      <div className="todos">
        {todos &&
          todos.map((todo) => (
            <div key={todo.id}>{JSON.stringify(todo) || ""}</div>
          ))}
      </div>
      <button></button>
    </div>
  );
};

export default TestComponent;
