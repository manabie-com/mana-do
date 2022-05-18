export const webStorage = {
  set(key: string, rawValue: any) {
    const value = typeof rawValue === 'string' ? rawValue : JSON.stringify(rawValue);

    window.localStorage.setItem(key, value);
  },
  get(key: string)  {
    const value: string | null= window.localStorage.getItem(key);

    try {
      return JSON.parse(value || '');
    } catch {
      return value;
    }
  },
  remove(key: string) {
    window.localStorage.removeItem(key);
  },
  removeAll() {
    window.localStorage.clear();
  }
};
