import * as actions from '../../store/todoActions'
import todoReducer from '../../store/todoReducer'

describe('reducer todo', () => {
    it('should return state todos when add todo', () => {
        const newTodo:any = {
            content: "1",
            created_date: "2021-08-03T01:52:23.388Z",
            id: "zfcHIU1NM",
            status: "ACTIVE",
            user_id: "firstUser",
        }
        const state = todoReducer(undefined,{
            type: actions.CREATE_TODO,
            payload:newTodo
        });
        expect(state.todos[0].id).toEqual('zfcHIU1NM');
        expect(state.todos[0].created_date).toEqual('2021-08-03T01:52:23.388Z');
        expect(state.todos[0].content).toEqual('1');
        expect(state.todos[0].status).toEqual('ACTIVE');
        expect(state.todos[0].user_id).toEqual('firstUser');
    })  
    it('should return state todos when delete all todos', () => {
        const state = todoReducer(undefined,{
            type: actions.DELETE_ALL_TODOS,
        });
        expect(state.todos).toEqual([]);
    })  
    it('should return state todos when delete todo', () => {
        const todoId:string = "tkMUcKuF_"
        const state = todoReducer(undefined,{
            type: actions.DELETE_TODO,
            payload:todoId
        });
        expect(state.todos).toEqual([]);
    }) 
})