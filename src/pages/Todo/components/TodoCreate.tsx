import * as React from "react";

interface ITodoCreateProps {}

const TodoCreate: React.FunctionComponent<any> = React.forwardRef(
  (props: any, ref: any) => {
    console.log("render create");
    return (
      <div className="Todo__creation">
        <input
          ref={ref}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyPress={props.onCreateTodo}
        />
      </div>
    );
  }
);

export default TodoCreate;
