import { todoReducer } from '../../slices/todoSlice';
import Service from '../../../service';
const todoActions = {
    getTodos: async (dispatch: any) => {
        const res = await Service.getTodos();
        if (res) {
            dispatch(
                todoReducer.setTodos({
                    todos: res
                })
            );
        }
    },
    addTodo: async (dispatch: any, todo:string) => {
        const resp = await Service.createTodo(todo);
        if(resp) {
            dispatch(
                todoReducer.addTodo({todo: resp })
            );
        } 
    },
    editTodoStatus: async (dispatch: any, id:string, status:string) => {
        const resp = await Service.editTodoStatus(id, status);
        if(resp) {
            dispatch(
                todoReducer.editTodoStatus({ id: id, status: status })
            );
        } 
    },
    editTodo: async (dispatch: any, id:string, content:string) => {
        const resp = await Service.editTodo(id, content);
        if(resp) {
            dispatch(
                todoReducer.editTodo({ id: id, content: content })
            );
        } 
    },
    deleteTodo: async (dispatch: any, id:string) => {
        const resp = await Service.deleteTodo(id);
        if(resp) {
            dispatch(
                todoReducer.deleteTodo({ id: id })
            );
        } 
    },
    deleteAllTodo: async (dispatch: any) => {
        const resp = await Service.deleteAll();
        if(resp) {
            dispatch(
                todoReducer.deleteAll()
            );
        } 
    },
    toggleAllTodo: async (dispatch: any, checked: boolean) => {
        const resp = await Service.toggleAllTodo(checked);
        if(resp) {
            dispatch(
                todoReducer.toggleAllTodo({ checked: checked })
            );
        } 
    },
}
export default todoActions;