import { isJsonString } from "utils";

export function saveToLocalStorage<T = object>(key: string, storeState: T): boolean {
  if (!localStorage) {
    return false;
  }

  try {
    const serializedState = typeof storeState === "string" ? storeState : JSON.stringify(storeState);
    localStorage.setItem(key, serializedState);
    return true;
  } catch (error) {
    throw new Error('store serialization failed');
  }
}

export function getFromLocalStorage<T = object>(key: string): T | undefined {
  if (!localStorage) {
    return;
  }

  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return;
    }
    return isJsonString(serializedState) ? JSON.parse(serializedState) : serializedState;
  } catch (error) {
    throw new Error('store deserialization failed');
  }
}
