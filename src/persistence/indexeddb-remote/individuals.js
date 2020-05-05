/**
 * @module indexeddb-remote/individuals
 * Propagate IndexedDB persistence layer changes related to individuals to the UI through events
 */
export default properties => {

	const { listeners, database } = properties

	/**
	 * UI notifying an individual was created
	 * Persist the individual and notify UI with resulting ID
	 */
	listeners.push({ query: "individualAdd", callback: (data) => {
		const { id, ...data_ } = data
		const response = database.transaction(['individuals'], 'readwrite').objectStore('individuals').add(data_)
		response.addEventListener("success", event => {
			self.postMessage({ query: "individualAdded", data: { id, offlineId: event.target.result, tree: data.tree } })
		})
	}})

	/**
	 * UI notifying an individual was updated
	 * Update the individual entry
	 */
	listeners.push({ query: "individualUpdate", callback: data => {
		database.transaction(['individuals'], 'readwrite').objectStore('individuals').put(data)
	}})

	/**
	 * UI notifying an individual was removed
	 * Update the individual entry
	 */
	listeners.push({ query: "individualRemove", callback: data => {
		database.transaction(['individuals'], 'readwrite').objectStore('individuals').delete(data.offlineId)
	}})


}
