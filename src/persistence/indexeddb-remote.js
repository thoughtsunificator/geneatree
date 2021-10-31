import Log from "../object/log.js"

(function() {

	self.postMessage({ query: "log", data: { type: Log.TYPE.DEBUG, message : "[persistence:indexeddb-remote] Loaded"} })

	const ENV = (import("../../env.js")).default

	const _listeners = []

	let _database = null

	self.addEventListener("message", event => {
		const { query, data } = event.data
		self.postMessage({ query: "log", data: { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-remote] Received query: ${query}`, data } })
		const listeners = _listeners.filter(listener => listener.query === query)
		if(_database === null) {
			self.postMessage({ query: "log", data: { type: Log.TYPE.DEBUG, message : "[persistence:indexeddb-remote] Database is not ready."} })
		} else if(listeners.length >= 1) {
			listeners.forEach(listener => listener.callback(data))
		} else {
			self.postMessage({ query: "log", data: { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-remote] Unrecognized query: ${query}`} })
		}
	})

	const _databaseRequest = indexedDB.open(ENV.INDEXEDDB_DATABASE_NAME, ENV.INDEXEDDB_DATABASE_VERSION)

	_databaseRequest.addEventListener("success", () => {
		self.postMessage({ query: "log", data: { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-remote] success`} })
		_database = _databaseRequest.result
		;(import("./indexeddb-remote/geneatree.js")).default({ worker: self, listeners: _listeners, database: _database });
		(import("./indexeddb-remote/trees.js")).default({ worker: self, listeners: _listeners, database: _database });
		(import("./indexeddb-remote/individuals.js")).default({  worker: self, listeners: _listeners, database: _database });
		(import("./indexeddb-remote/notes.js")).default({  worker: self, listeners: _listeners, database: _database });
		_database.addEventListener("versionchange", event => {
			self.postMessage({ query: "log", data: { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-remote] database version changed: closing database..`, data: event } })
			_database.close()
		})
		_database.addEventListener("close", event => {
			self.postMessage({ query: "log", data: { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-remote] connection closed`, data: event } })
		})
		self.postMessage({ query: "log", data: { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-remote] retrieving stores data...` } })
		const transaction = _database.transaction(['trees', 'individuals', 'notes'], 'readwrite')
		const results = new Promise((resolve, reject) => {
			const results = {}
			const storeNames = Object.values(transaction.objectStoreNames)
			for(const [index, storeName] of storeNames.entries()) {
				const request = transaction.objectStore(storeName).getAll()
				request.addEventListener("success", event => {
					results[event.target.source.name] = event.target.result
					if(index === storeNames.length - 1) {
						resolve(results)
					}
				})
				request.addEventListener("error", event => {
					reject(`[persistence:indexeddb-remote] error while retrieving store results`, event)
				})
			}
		})
		self.postMessage({ query: "log", data: { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-remote] stores data retrieved...`, data: results} })
		const trees = results.trees
		const individuals = results.individuals
		const notes = results.notes
		self.postMessage({ query: "trees load", data: { trees, individuals, notes } })
	})

	_databaseRequest.addEventListener("upgradeneeded", event => {
		self.postMessage({ query: "log", data: { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-remote] upgradeneeded`, data: event } })
		const database = event.target.result
		if(!database.objectStoreNames.contains("trees")) {
			database.createObjectStore("trees", { autoIncrement : true, keyPath: "id" })
		}
		if(!database.objectStoreNames.contains("individuals")) {
			database.createObjectStore("individuals", { autoIncrement : true, keyPath: "id" })
		}
		if(!database.objectStoreNames.contains("notes")) {
			database.createObjectStore("notes", { autoIncrement : true, keyPath: "id" })
		}
	})

	_databaseRequest.addEventListener("error", event => {
		self.postMessage({ query: "log", data: { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-remote] An error occured while trying to open the database.`, data: event } })
	})

})()
