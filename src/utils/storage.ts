export const getItem = <T>(key: string): Array<T> => {
  const items = localStorage.getItem(key) || null;

  return !items ? undefined : JSON.parse(items);
};

export const addItem = <T>(key: string, item: T): void => {
  const items = getItem<T>(key) || [];
  items.push(item);
  localStorage.setItem(key, JSON.stringify(items));
};

export const setItem = <T>(key: string, items: Array<T>): void => {
  localStorage.setItem(key, JSON.stringify(items));
};

export const clear = (key: string): void => {
  localStorage.removeItem(key);
};
