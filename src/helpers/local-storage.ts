export enum LocalStorageKeys {
  todoKey = 'manabie-todolist-thaind-fe'
}

const isClientSide = typeof window !== undefined

export const removeLocalItem = (key: LocalStorageKeys) =>
  key && isClientSide && localStorage.removeItem(key)

export const addLocalItem = (key: LocalStorageKeys, value: string) =>
  key && isClientSide && localStorage.setItem(key, value)

export const getLocalItem = (key: LocalStorageKeys) =>
  key && isClientSide && localStorage.getItem(key)

export const removeAllLocalItems = () => isClientSide && localStorage.clear()
