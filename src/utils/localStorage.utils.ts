class LocalStorageUtils {
  getItem(key: string) {
    const value = localStorage.getItem(key) || "";
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  setItem(key: string, value: any) {
    const valueJson = JSON.stringify(value);
    localStorage.setItem(key, valueJson);
    return valueJson;
  }
}

export default new LocalStorageUtils();
