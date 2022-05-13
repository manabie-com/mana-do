export default interface IDatabase<T> {
	findById(id: string): T | null;
	find(): T[] | [];
	insert(item: T): T;
	delete(id: string): boolean;
	batchDelete(ids: string[]): boolean;
	update(id: string, newData: Partial<T>): boolean;
}
