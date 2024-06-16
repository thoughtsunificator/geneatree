/**
 * @module indexeddb-local
 * Middleware between UI and IndexedDB persistence layer.
 * Propagate UI actions to the IndexedDB persistence layer through events
 */
import { Observable } from "domodel"
import LocalGeneatree from "./indexeddb-local/geneatree.js"
import LocalTrees from "./indexeddb-local/trees.js"
import LocalIndividuals from "./indexeddb-local/individuals.js"
import LocalNotes from "./indexeddb-local/notes.js"
import LocalRelationship from "./indexeddb-local/relationships.js"

import IndexeDBWorker from "worker!./indexeddb-remote.js"

import Log from "../object/log.js"

export default properties => {

	const { geneatree } = properties

	const worker = new IndexeDBWorker()

	geneatree.emit("osdSet", { text: "Connecting to local...", type: "info" })

	geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: "[persistence:indexeddb-local] Module Loaded" })

	const listeners = []

	const properties_ = { ...properties, worker, listeners }

	let dataRetrieved = false

	listeners.push({ query: "log", callback: data => {
		geneatree.emit("log", data)
	}})

	listeners.push({ query: "load", callback: data => {
		const listenerIndex = listeners.findIndex(listener => listener.query === "load")
		listeners.splice(listenerIndex, 1)
		dataRetrieved = true
		LocalGeneatree(properties_)
		LocalTrees(properties_)
		LocalIndividuals(properties_)
		LocalNotes(properties_)
		LocalRelationship(properties_)
		geneatree.emit("osdSet", { text: "Connected to local", type: "valid" })
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-local] data retrieved...` } )
		const trees = data.trees.map(tree => {
			tree.individuals = data.individuals.filter(individual => individual.tree.toString() === tree.id.toString())
			tree.individuals = tree.individuals.map(individual => {
				individual.notes = data.notes.filter(note => note.individual.toString() === individual.id.toString())
				return individual
			})
			return tree
		})
		for(const tree of trees) {
			tree.individuals[0].offlineId = tree.individuals[0].id
			geneatree.trees.emit("add", [{ id: tree.id, type: "offline", meta: tree.meta }, tree.individuals])
		}
		geneatree.emit("indexedbdbLoaded")
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
		if(!dataRetrieved) {
			geneatree.emit("osdSet", { type: "error", text : `[persistence:indexeddb-local] Unable to retrieve local data` } )
		}
	})

	worker.postMessage({
		query: "load",
		data: {
			databaseName: window.INDEXEDDB_DATABASE_NAME,
			databaseVersion: window.INDEXEDDB_DATABASE_VERSION
		}
	})
	geneatree.emit("log", { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-local] waiting for remote to load...` } )

}
