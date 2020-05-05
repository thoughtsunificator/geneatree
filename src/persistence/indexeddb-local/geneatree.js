/**
 * @module indexeddb-local/geneatree
 * Propagate UI actions related to the application to the IndexedDB persistence layer through events
 */
export default properties => {

	const { geneatree, worker, listeners } = properties

	/**
	 * UI is asking for the local database to be cleared
	 */
	geneatree.listen("persistenceIndexeddbClear", data => {
		worker.postMessage({ query: "clear" })
	})

	/**
	 * Local notifying that the local database has been cleared
	 * Notify the UI that it should start the reboot process
	 */
	listeners.push({ query: "clearSuccess", callback: data => {
		geneatree.emit("reboot", { text: "IndexedDB cleared", type: "info" })
	}})

	/**
	 * Local notifying that the local database could not be cleared due to an error
	 */
	listeners.push({ query: "clearError", callback: data => {
		geneatree.emit("osdSet", { text: "Could not clear IndexedDB", type: "info" })
	}})

}
