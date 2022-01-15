class StorageService<T> {

  constructor(public key: string, public initialValue: T) {}

  private serializer(value: T) {
    return JSON.stringify(value)
  }

  private deserializer(value: string): T {
    return JSON.parse(value)
  }

  get() {
    try {
      const storageValue = localStorage.getItem(this.key)
      if (storageValue !== null) {
        return this.deserializer(storageValue)
      } else {
        localStorage.setItem(this.key, this.serializer(this.initialValue))
        return this.initialValue
      }
    } catch {
      return this.initialValue
    }
  }

  set(value: T) {
    localStorage.setItem(this.key, this.serializer(value))
  }

  remove() {
    localStorage.removeItem(this.key)
    return this.initialValue
  }
}

export default StorageService