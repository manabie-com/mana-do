export const getItemLocalStorage = (key: string) => {
  if (!key) {
    return "";
  }

  const value = localStorage.getItem(key) || "";

  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export const setItemLocalStorage = (key: string, value: string) => {
  if (!key) {
    return "";
  }

  const valueJson = JSON.stringify(value);
  localStorage.setItem(key, valueJson);
  return valueJson;
};
