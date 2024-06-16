/**
 * @module indexeddb-remote/trees
 * Propagate IndexedDB persistence layer changes related to trees to the UI through events
 */
export default properties => {

	const { listeners, database } = properties

	/**
	 * UI notifying a tree was created
	 * Persist the tree and notify UI with resulting ID
	 */
	listeners.push({ query: "treeAdd", callback: (data) => {
		const { id, ...data_ } = data
		const response = database.transaction(['trees'], 'readwrite').objectStore('trees').add(data_)
		response.addEventListener("success", event => {
			self.postMessage({ query: "treeAdded", data: { id, offlineId: event.target.result } })
		})
	}})

	/**
	 * UI notifying a tree was updated
	 * Update the tree entry
	 */
	listeners.push({ query: "treeUpdate", callback: data => {
		database.transaction(['trees'], 'readwrite').objectStore('trees').put(data)
	}})

	/**
	 * UI notifying a tree was removed
	 * Update the tree entry
	 */
	listeners.push({ query: "treeRemove", callback: data => {
		database.transaction(['trees'], 'readwrite').objectStore('trees').delete(data.offlineId)
	}})

}
