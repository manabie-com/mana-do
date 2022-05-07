import Service from '../service';

test('Load todo list from local storage', () => {
    Service.getTodos().then(todos=>{
        var todosInStorage = JSON.parse(localStorage.getItem('todos'));
        expect(todos).toEqual(todosInStorage);
    });
});