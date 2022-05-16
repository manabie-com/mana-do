const TODO_KEY = `todo`;

export function saveTodos<T = object>(storeState: T): boolean {
  if (!localStorage) {
    return false;
  }

  try {
    const serializedState = JSON.stringify(storeState);
    localStorage.setItem(TODO_KEY, serializedState);
    return true;
  } catch (error) {
    throw new Error('store serialization failed');
  }
}

export function loadTodos<T = object>(): T | [] | undefined {
  if (!localStorage) {
    return;
  }

  try {
    const serializedState = localStorage.getItem(TODO_KEY);
    if (serializedState == null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    throw new Error('store deserialization failed');
  }
}
