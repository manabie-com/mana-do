export const getItemLocalStorage = (key: string, defaultValue: string) => {
  if (!key) {
    return JSON.parse(defaultValue);
  }

  const value = localStorage.getItem(key) || defaultValue;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export const setItemLocalStorage = (key: string, value: any) => {
  if (!key) {
    return "";
  }

  const valueJson = JSON.stringify(value);
  localStorage.setItem(key, valueJson);
  return valueJson;
};
