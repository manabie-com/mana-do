import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from 'react'

import reducer, { initialState } from '@/store/reducer'
import { setTodos, createTodo, toggleAllTodos } from '@/store/actions'
import Service from '@/service'
import { TodoStatus } from '@/models/todo'
import InputField from '@/components/input-field'
import TodoList from '@/components/todo-list'
import ToolBar from '@/components/tool-bar'
import { dispatchForCode } from '@/utils'

export type EnhanceTodoStatus = TodoStatus | 'ALL'

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState)
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL')

  /**
   * Should be strong type for ref instead any
   */
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchTodos = async () => {
      /**
       * I don't really like anonymous function
       * That mean I have to review all of the lines code inside function to know What does this function do?
       */
      const resp = await Service.getTodos()
      dispatch(setTodos(resp || []))
    }
    fetchTodos()
  }, [])

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
  }

  const onCreateTodo = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { value } = inputRef.current || {}

      if (!value || !value.trim()) {
        return
      }

      dispatchForCode(e, async (key) => {
        /**
         * Hide input when user do with keys event: Enter || Esc
         */
        if ([13, 'Enter'].includes(key || '')) {
          /**
           * That should be a clear naming -> use newTodo instead resp
           * I don't use trim function before save todo into store (just check for full space). Maybe this depend to business rules
           */
          const newTodo = await Service.createTodo(value)
          dispatch(createTodo(newTodo))

          /**
           * What is `!.` operator? https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
           * Reset input value after submit
           */
          inputRef.current!.value = ''
        }
      })
    },
    [dispatch]
  )

  const isAllCompleted = useMemo(() => {
    return todos.every((todo) => todo.status === TodoStatus.COMPLETED)
  }, [todos])

  return (
    <div className="todo-app">
      <h1>Manabie Todo List Challenge</h1>
      <div className="todo__container">
        <div className="todo__creation">
          {todos.length > 0 ? (
            <InputField
              className="todo__creation__check-all"
              type="checkbox"
              onChange={onToggleAllTodo}
              checked={isAllCompleted}
            />
          ) : (
            <div />
          )}
          <InputField
            ref={inputRef}
            className="todo__input"
            placeholder="What need to be done?"
            onKeyDown={onCreateTodo}
          />
        </div>
        <TodoList currentStatus={showing} todos={todos} dispatch={dispatch} />
        <ToolBar
          dispatch={dispatch}
          todos={todos}
          currentStatus={showing}
          onClickStatus={setShowing}
        />
      </div>
    </div>
  )
}

export default ToDoPage
