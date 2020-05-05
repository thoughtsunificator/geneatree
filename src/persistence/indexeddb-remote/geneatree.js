/**
 * @module indexeddb-remote/geneatree
 * Propagate IndexedDB persistence layer changes related to the application to the UI through events
 */
export default properties => {

	const { listeners, database } = properties

	/**
	 * UI notifying it wants the database cleared
	 * Clear the database and notify UI
	 */
	listeners.push({ query: "clear", callback: () => {
		const request = indexedDB.deleteDatabase(database.name)
		request.addEventListener("success", event => {
				self.postMessage({ query: "clearSuccess" })
		})
		request.addEventListener("error", event => {
				self.postMessage({ query: "clearError" })
		})
	}})

}
