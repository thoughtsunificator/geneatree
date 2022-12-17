// import Log from "../object/log.js"
import RemoteGeneatree from "./indexeddb-remote/geneatree.js"
import RemoteTrees from "./indexeddb-remote/trees.js"
import RemoteIndividuals from "./indexeddb-remote/individuals.js"
import RemoteNotes from "./indexeddb-remote/notes.js"

const _listeners = []

self.addEventListener("message", event => {
	const { query, data } = event.data
	self.postMessage({ query: "log", data: { type: "debug", message : `[persistence:indexeddb-remote] Received query: ${query}`, data } })
	const listeners = _listeners.filter(listener => listener.query === query)
	if(listeners.length >= 1) {
		listeners.forEach(listener => listener.callback(data))
	} else {
		self.postMessage({ query: "log", data: { type: "debug", message : `[persistence:indexeddb-remote] Unrecognized query: ${query}`} })
	}
})

_listeners.push({ query: "initialize", callback: (data) => {
	const listenerIndex = _listeners.findIndex(listener => listener.query === "initialize")
	_listeners.splice(listenerIndex, 1)
	
	const _databaseRequest = indexedDB.open(data.databaseName, data.databaseVersion)
	_databaseRequest.addEventListener("success", async () => {
		const database = _databaseRequest.result
		database.addEventListener("versionchange", event => {
			self.postMessage({ query: "log", data: { type: "debug", message : `[persistence:indexeddb-remote] database version changed: closing database..` } })
			database.close()
		})
		database.addEventListener("close", event => {
			self.postMessage({ query: "log", data: { type: "debug", message : `[persistence:indexeddb-remote] connection closed` } })
		})
		RemoteGeneatree({ worker: self, listeners: _listeners, database });
		RemoteTrees({ worker: self, listeners: _listeners, database });
		RemoteIndividuals({  worker: self, listeners: _listeners, database });
		RemoteNotes({  worker: self, listeners: _listeners, database });
		self.postMessage({ query: "initialized" })
		const transaction = database.transaction(['trees', 'individuals', 'notes'], 'readwrite')
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
		const { trees, individuals, notes } = await results
		self.postMessage({ query: "log", data: { type: "debug", message : `[persistence:indexeddb-remote] stores data retrieved...` } })
		self.postMessage({ query: "treesLoad", data: { trees, individuals, notes } })
	})

	_databaseRequest.addEventListener("upgradeneeded", event => {
		self.postMessage({ query: "log", data: { type: "debug", message : `[persistence:indexeddb-remote] upgradeneeded` } })
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
		self.postMessage({ query: "log", data: { type: "debug", message : `[persistence:indexeddb-remote] An error occured while trying to open the database.` } })
	})
}})

self.postMessage({ query: "log", data: { type: "debug", message : "[persistence:indexeddb-remote] Loaded"} })