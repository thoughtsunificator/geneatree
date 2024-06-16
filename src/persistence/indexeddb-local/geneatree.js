/**
 * @module indexeddb-local/geneatree
 * Propagate UI actions related to the application to the IndexedDB persistence layer through events
 */
export default properties => {

	const { geneatree, worker, listeners } = properties

	geneatree.listen("persistenceIndexeddbClear", data => {
		worker.postMessage({ query: "clear" })
	})

	listeners.push({ query: "clearSuccess", callback: data => {
		geneatree.emit("reboot", { text: "IndexedDB cleared", type: "info" })
	}})

	listeners.push({ query: "clearError", callback: data => {
		geneatree.emit("osdSet", { text: "Could not clear IndexedDB", type: "info" })
	}})

}
