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

/**
 * Plug UI to local persistence layer / IndexedDB
 */
export default properties => {

	const { geneatree } = properties

	const worker = new IndexeDBWorker()

	geneatree.emit("osdSet", { text: "Connecting to local persistence layer...", type: "info" })

	geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: "[persistence:indexeddb-local] Module Loaded" })

	const listeners = []

	const properties_ = { ...properties, worker, listeners }

	/**
	 * Whether the initial data payload was received
	 * It might not have been processed yet
	 */
	let dataRetrieved = false

	/**
	 * Local notifying it wants to log
	 * These logs can be accessed through the UI
	 */
	listeners.push({ query: "log", callback: data => {
		geneatree.emit("log", data)
	}})

	/**
	 * Local notifying it has data for us to load
	 * This is a one time event
	 */
	listeners.push({ query: "load", callback: data => {
		const listenerIndex = listeners.findIndex(listener => listener.query === "load")
		listeners.splice(listenerIndex, 1)
		dataRetrieved = true
		// Initialize event listeners
		LocalGeneatree(properties_)
		LocalTrees(properties_)
		LocalIndividuals(properties_)
		LocalNotes(properties_)
		LocalRelationship(properties_)
		geneatree.emit("osdSet", { text: "Connected to local persistence layer", type: "valid" })
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-local] data retrieved...` } )
		try {
			// Make a list of trees from the initial data payload sent by the local persistence layer
			const trees = data.trees.map(tree => {
				tree.individuals = data.individuals.filter(individual => individual.tree.toString() === tree.id.toString())
				tree.relationships = data.relationships.filter(relationship => relationship.tree.toString() === tree.id.toString())
				tree.individuals = tree.individuals.map(individual => {
					individual.notes = data.notes.filter(note => note.individual.toString() === individual.id.toString())
					return individual
				})
				return tree
			})
			for(const tree of trees) {
				// Rename id to offlineId (to avoid confusion)
				tree.individuals[0].offlineId = tree.individuals[0].id
				// Notify UI it should create/add a tree
				geneatree.trees.emit("add", [{ id: tree.id, type: "offline", meta: tree.meta }, tree.individuals, tree.relationships])
			}
		} catch(ex) {
			console.error(ex)
			geneatree.emit("osdSet", { type: "error", text : `[persistence:indexeddb-local] Unable to load local data` } )
		}
		geneatree.emit("indexedbdbLoaded") // notify UI local persistence has been loaded
	}})

	/**
	 * Local notifying an event
	 * Propagate to event listeners
	 */
	worker.addEventListener("message", event => {
		const { query, data } = event.data

		geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: `[persistence:indexeddb-local] Received query: ${query}`, data })

		const listeners_ = listeners.filter(listener => listener.query === query)

		if(listeners_.length >= 1) {
			listeners_.forEach(listener => listener.callback(data))
		} else {
			geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: `[persistence:indexeddb-local] Unknown query: ${query}` })
		}
	})

	/**
	 * Local notifying an error
	 * Send a feedback to user through the OSD
	 */
	worker.addEventListener("error", event => {
		geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: "[persistence:indexeddb-local] An error occured", event })
		if(!dataRetrieved) {
			geneatree.emit("osdSet", { type: "error", text : `[persistence:indexeddb-local] Unable to retrieve local data` } )
		}
	})

	// Ask local persistence to send the initial data payload
	worker.postMessage({
		query: "load",
		data: {
			databaseName: window.INDEXEDDB_DATABASE_NAME,
			databaseVersion: window.INDEXEDDB_DATABASE_VERSION
		}
	})
	geneatree.emit("log", { type: Log.TYPE.DEBUG, message : `[persistence:indexeddb-local] waiting for remote to load...` } )

}
