export const TODOS_KEY = "TODOS_KEY";

export const storeItem = (key: string, data: any) => {
  const jsonString = JSON.stringify(data);
  localStorage.setItem(key, jsonString);
}

export const getItem = (key: string) => {
  const dataString = localStorage.getItem(key);
  const dataJson = dataString ? JSON.parse(dataString) : null;
  return dataJson;
}

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
}