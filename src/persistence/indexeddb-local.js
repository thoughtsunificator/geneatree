import LocalGeneatree from "./indexeddb-local/geneatree.js"
import LocalTrees from "./indexeddb-local/trees.js"
import LocalIndividuals from "./indexeddb-local/individuals.js"
import LocalNotes from "./indexeddb-local/notes.js"

import IndexeDBWorker from "worker!./indexeddb-remote.js"

import Log from "../object/log.js"

export default properties => {

	const { geneatree } = properties

	const worker = new IndexeDBWorker()

	geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: "[persistence:indexeddb-local] Loaded" })

	const listeners = []
	
	const properties_ = { ...properties, worker, listeners }

	listeners.push({ query: "log", callback: data => {
		geneatree.emit("log", data)
	}})

	listeners.push({ query: "initialized", callback: () => {
		geneatree.emit("osdSet", { text: "IndexedDB initialized", type: "info", duration: 2500 })
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-local] worker initialzied; retrieving data...` } )
		const listenerIndex = listeners.findIndex(listener => listener.query === "initialized")
		listeners.splice(listenerIndex, 1)
		LocalGeneatree(properties_)
		LocalTrees(properties_)
		LocalIndividuals(properties_)
		LocalNotes(properties_)
	}})
	
	worker.addEventListener("message", event => {
		const { query, data } = event.data
		
		geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: `[persistence:indexeddb-local] Received query: ${query}`, data })

		const listeners_ = listeners.filter(listener => listener.query === query)

		if(listeners_.length >= 1) {
			listeners_.forEach(listener => listener.callback(data))
		} else {
			geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: `[persistence:indexeddb-local] Unrecognized query: ${query}` })
		}
	})

	worker.addEventListener("error", event => {
		geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: "[persistence:indexeddb-local] An error occured", event })
	})
	
	worker.postMessage({
		query: "initialize",
		data: {
			databaseName: window.INDEXEDDB_DATABASE_NAME, 
			databaseVersion: window.INDEXEDDB_DATABASE_VERSION 
		}
	})
	geneatree.emit("log", { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-local] waiting for remote to initialize...` } )

}
