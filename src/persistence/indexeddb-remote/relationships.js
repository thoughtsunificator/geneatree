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
		const response = database.transaction(['relationships'], 'readwrite').objectStore('relationships').add({ type: data.type, relationshipIndividuals: data.relationshipIndividuals, meta: data.meta, tree: data.tree })
		response.addEventListener("success", event => {
			self.postMessage({ query: "relationshipAdded", data: { id: data.id, offlineId: event.target.result, relationship: data } })
		})
	}})

	/**
	 * UI notifying a relationship was removed
	 * Remove the relationship entry
	 */
	listeners.push({ query: "relationshipRemove", callback: data => {
		database.transaction(['relationships'], 'readwrite').objectStore('relationships').delete(data.offlineId)
	}})

}
