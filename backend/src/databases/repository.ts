import { JSONFile, Low } from 'lowdb';
import { join } from 'path';
import shortid from 'shortid';

export default class BaseRepository {
  protected fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  protected async get<T>(filter?: object): Promise<any[]> {
    const db = this.getDb<T>();
    await db.read();
    let filteredData = db.data[this.fileName];

    if (filter) {
      for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
          const value = filter[key];
          filteredData = filteredData.filter((elm) => elm[key] === value);
        }
      }
    }

    return filteredData;
  }

  protected async getOne<T>(id: string): Promise<any> {
    const db = this.getDb<T>();
    await db.read();
    return db.data[this.fileName].filter((elm) => elm.id === id);
  }

  protected async create<T>(newData: object): Promise<any> {
    const db = this.getDb<T>();
    await db.read();

    newData['id'] = shortid();
    db.data[this.fileName].push(newData);

    await db.write();
    return newData;
  }

  protected async update<T>(id: string, updateData: object): Promise<any> {
    const db = this.getDb<T>();
    await db.read();
    const dbOne = db.data[this.fileName].find((elm) => elm.id === id);

    if (updateData) {
      for (const key in updateData) {
        if (updateData.hasOwnProperty(key)) {
          const value = updateData[key];
          dbOne[key] = value;
        }
      }
    }

    await db.write();
    return dbOne;
  }

  protected async delete<T>(id: string): Promise<boolean> {
    const db = this.getDb<T>();
    await db.read();
    db.data[this.fileName] = db.data[this.fileName].filter((elm) => elm.id !== id);
    await db.write();
    return true;
  }

  protected async deleteAll<T>(filter?: object): Promise<boolean> {
    const db = this.getDb<T>();
    await db.read();
    let filteredData = [];

    if (filter) {
      filteredData = db.data[this.fileName].filter((elm) => {
        let isValid = true;

        for (const key in filter) {
          if (filter.hasOwnProperty(key)) {
            if (elm[key] === filter[key]) {
              isValid = false;
              break;
            }
          }
        }

        return isValid;
      });
    }

    db.data[this.fileName] = filteredData;
    await db.write();
    return true;
  }

  private getDb<T>(): Low<T> {
    const filePath = join(__dirname, `${this.fileName}.json`);
    const adapter = new JSONFile<T>(filePath);
    return new Low<T>(adapter);
  }
}
