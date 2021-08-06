import * as actions from '../../store/todoActions'

describe('set todo',()=>{
    it('should create an action to add todo success',()=>{
        const newTodo:any = {
            content: "1",
            created_date: "2021-08-03T01:52:23.388Z",
            id: "zfcHIU1NM",
            status: "ACTIVE",
            user_id: "firstUser",
        }
        const expectedAction = {
            type: actions.CREATE_TODO,
            payload:newTodo
        }
        expect(actions.createTodo(newTodo)).toEqual(expectedAction)
    })
    it('should create an action to delete todo success',()=>{
        const todoId:string = "aB-JEqLLx"
        const expectedAction = {
            type: actions.DELETE_TODO,
            payload:todoId
        }
        expect(actions.deleteTodo(todoId)).toEqual(expectedAction)
    })
    it('should create an action to delete all todos success',()=>{
        const expectedAction = {
            type: actions.DELETE_ALL_TODOS,
        }
        expect(actions.deleteAllTodos()).toEqual(expectedAction)
    })
})



