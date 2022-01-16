import { saveToLocalStorage } from "storage";

const fakeLocalStorage = (function () {
  let store: {[key: string]: any} = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: any) {
      store[key] = typeof value === "string" ? value : JSON.stringify(value);
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    }
  };
})();

describe('storage', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  test('saves the key to the storage', () => {
    const key = "fake-key";
    const value = "fake-value";
    saveToLocalStorage(key, value);
    expect(localStorage.getItem(key)).toBe(value);
  });
});