export function setLocalStorage<T>(key: string, data?: T): void {
  if (!data) {
    return;
  }

  try {
    const serializedData =
      typeof data === "string" ? data : JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    throw new Error("Something went wrong when storing data!");
  }
}

export function getLocalStorage<T>(key: string): T | undefined {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return;
    }
    return JSON.parse(serializedData)
      ? JSON.parse(serializedData)
      : serializedData;
  } catch (error) {
    throw new Error("Something when wrong when getting data!");
  }
}
