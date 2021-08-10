import { Dispatch } from "redux"
import { Todo } from "src/redux/types"

export interface TodoProps {
    dispatch: Dispatch
    todos: Todo[]
}