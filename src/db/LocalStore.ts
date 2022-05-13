import shortid from "shortid";
import { Todo } from "models/todo";
import IDatabase from "./IDatabase";

export class LocalStore implements IDatabase<Todo> {
	private static _instance: LocalStore;
	dbName: string;

	constructor() {
		this.dbName = "todo";
		return;
	}

	private save(items: Todo[]) {
		localStorage.setItem(this.dbName, JSON.stringify(items));
	}

	find() {
		const items = localStorage.getItem(this.dbName);

		if (items) {
			return JSON.parse(items);
		}

		return [];
	}

	findById(id: string) {
		const items = this.find();
		return items.find((i: Todo) => i.id === id);
	}

	insert(item: Todo): Todo {
		const items = this.find();
		const newItem = { ...item, id: shortid() };
		items.push(newItem);
		this.save(items);

		return newItem;
	}

	delete(id: string) {
		const items = this.find();
		const itemsAfterRemove = items.filter((i: Todo) => {
			return i.id !== id;
		});
		this.save(itemsAfterRemove);

		return true;
	}

	batchDelete(ids: string[]) {
		const items = this.find();
		const itemsAfterRemove = items.filter(
			(i: Todo) => ids.indexOf(i.id) < 0,
		);

		this.save(itemsAfterRemove);

		return true;
	}

	update(id: string, newData: Partial<Todo>) {
		const items = this.find();

		// check item exist
		const itemIndex = items.findIndex((i: Todo) => i.id === id);
		if (itemIndex < 0) {
			return false;
		}

		items[itemIndex] = {
			...items[itemIndex],
			...newData,
			id,
		};

		this.save(items);

		return true;
	}

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}
}

export default LocalStore.Instance;
