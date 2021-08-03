import shortid from 'shortid';

class DBStore {
  _dbName: string;
  constructor(name: string) {
    this._dbName = name;
    if (!localStorage[name]) {
			const data = {
				todos: []
			};
			localStorage[name] = JSON.stringify(data);
		}
  }
  /**
   * Finds items based on a query given as a JS object
   * @param query 
   * @param callback 
   */
  find(query: any, callback: any) {
    if (!callback) {
			return;
		}

		var todos = JSON.parse(localStorage[this._dbName]).todos;

		callback.call(this, todos.filter(function (todo: any) {
			for (var q in query) {
				if (query[q] !== todo[q]) {
					return false;
				}
			}
			return true;
		}));
  }

  /**
   * Will retrieve all data from the collection
   * @param callback 
   */
  findAll(callback: any) {
		callback = callback || function () {};
		callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
	};

  /**
   * Will save the given data to the DB. If no item exists it will create a new
	 * item, otherwise it'll simply update an existing item's properties
   * @param updateData 
   * @param callback 
   * @param id 
   */
  save(updateData: any, callback: any, id: any) {
		var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;

		callback = callback || function () {};

		// If an ID was actually given, find the item and update each property
		if (id) {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].id === id) {
					for (var key in updateData) {
						todos[i][key] = updateData[key];
					}
          todos[i].updated_date = new Date().toISOString();
					break;
				}
			}

			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
		} else {
			// Generate an ID
			updateData.id = shortid();
      updateData.created_date = new Date().toISOString()

			todos.push(updateData);
			localStorage[this._dbName] = JSON.stringify(data);
			callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
		}
	};
  
  delete(callback: any, id: any) {
		var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;

		callback = callback || function () {};

    todos = todos.filter((item: any) => item.id !== id);
    data.todos = todos;
    localStorage[this._dbName] = JSON.stringify(data);
		callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
	};

  /**
   * Will drop all storage and start fresh
   * @param callback 
   */
  drop(callback: any) {
		localStorage[this._dbName] = JSON.stringify({todos: []});
		callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
	};

  updateAll(updateData: any, callback: any) {
    var data = JSON.parse(localStorage[this._dbName]);
		var todos = data.todos;
		callback = callback || function () {};

    for (var i = 0; i < todos.length; i++) {
      for (var key in updateData) {
        todos[i][key] = updateData[key];
      }
      todos[i].updated_date = new Date().toISOString();
    }

		localStorage[this._dbName] = JSON.stringify(data);
    callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
	};
}

export default DBStore;