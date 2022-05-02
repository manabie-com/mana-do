import { isTodoActive } from "../utils";
import { getToDoList } from "../utils/utils"

// check if all status are completed. This will changed the checkbox state to checked in toolbar component.
export const checkToDoStatus = () => {
    const todos = getToDoList();
    const activeToDos = todos.filter((todo) => isTodoActive(todo)); // check if there are still active to do.
    return activeToDos.length ? false : true; // return false if there's active to do, return true if there's no active to do.
}