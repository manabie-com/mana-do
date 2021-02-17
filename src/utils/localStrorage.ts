const storage = {
  setArrayIntoKey(key: string, obj: object) {
    localStorage.setItem(key, JSON.stringify(obj));
  },
  getArrayFromKey(key: string) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  },
};

export default storage;
