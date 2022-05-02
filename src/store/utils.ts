export const useSetToDos = (data: string) => localStorage.setItem('toDoList', data);

export const useGetToDos = () => localStorage.getItem('toDoList');
