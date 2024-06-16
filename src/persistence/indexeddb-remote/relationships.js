/**
 * @module indexeddb-remote/relationships
 * Propagate IndexedDB persistence layer changes related to relationships to the UI through events
 */
export default properties => {

	const { listeners, database } = properties

	/**
	 * UI notifying a relationship was created
	 * Persist the relationship and notify UI with resulting ID
	 */
	listeners.push({ query: "relationshipAdd", callback: (data) => {
		const response = database.transaction(['notes'], 'readwrite').objectStore('relationships').add(data)
		response.addEventListener("success", event => {
			self.postMessage({ query: "relationshipAdded", data: { id: data.id, offlineId: event.target.result, relationship: data } })
		})
	}})

}
