# My findings

## Bugs

- To-dos are created twice or deleted twice

  **Causes**: directly mutate state

  ```
  case DELETE_TODO:
  	const index1 = state.todos.findIndex((todo) => todo.id === 	action.payload);
  	state.todos.splice(index1, 1);

  case CREATE_TODO:
  	state.todos.push(action.payload);

  case UPDATE_TODO_STATUS:
  	//
  	return {
  		...state,
  		todos: state.todos
  	}
  ```

  **Solution**: no direct state mutation, use non-mutating array methods like map, filter

  ```
  case  CREATE_TODO: {
  		return {
  			...state,
  			todos: [...state.todos, action.payload],
  			};
  		}
  ```

- List rendering with index as key
  - Change to todo.id

## Implementation

- [x] Data persistence to localStorage
- [x] Responsive UI
- [x] Editable todo

## Unfinished

- [ ] Unit testing, probably 60 - 70% are finished
