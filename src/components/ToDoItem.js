import React from "react";

class ToDoItem extends React.Component {
  constructor(props) {
    super(props);
    this.refInput = { ...React.createRef() };
    this.state = {
      status: String(props.todo.status)
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.todo.status !== this.state.status) {
      this.setState({
        status: nextProps.todo.status
      });
    }
    return nextState.status !== this.state.status;
  }

  render() {
    const {
      todo,
      onUpdateTodoStatus,
      dispatch,
      updateTodo,
      deleteTodo
    } = this.props;
    console.log("%c render:", "color:#00ffcc;font-weight:bold", todo.id);
    return (
      <div className="ToDo__item">
        <input
          type="checkbox"
          checked={this.state.status === "COMPLETED"}
          onChange={e => {
            onUpdateTodoStatus(e, todo.id);
            this.setState({
              status: e.target.checked ? "COMPLETED" : "ACTIVE"
            });
          }}
        />
        <input
          type="text"
          ref={this.refInput}
          defaultValue={todo.content}
          style={{
            width: "100%",
            margin: "0 5px",
            boxShadow: "none"
          }}
          placeholder="Is required"
          readOnly={true}
          onDoubleClick={() => {
            this.refInput.current.removeAttribute("readonly");
          }}
          onBlur={e => {
            const _value = e.target.value;
            if (_value !== null && _value !== undefined && _value !== "") {
              dispatch(updateTodo(todo.id, _value));
            } else {
              this.refInput.current.value = todo.content;
              dispatch(updateTodo(todo.id, todo.content));
            }
            this.refInput.current.setAttribute("readonly", true);
          }}
          onKeyDown={e => {
            const _value = e.target.value;
            if (e.key === "Enter") {
              if (_value !== null && _value !== undefined && _value !== "") {
                dispatch(updateTodo(todo.id, _value));
              } else {
                this.refInput.current.value = todo.content;
              }
              this.refInput.current.setAttribute("readonly", true);
            }
          }}
        />
        <button
          className="Todo__delete"
          onClick={() => dispatch(deleteTodo(todo.id))}
        >
          X
        </button>
      </div>
    );
  }
}

export default ToDoItem;
