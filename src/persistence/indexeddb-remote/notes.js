/**
 * @module indexeddb-remote/notes
 * Propagate IndexedDB persistence layer changes related to notes to the UI through events
 */
export default properties => {

	const { listeners, database } = properties

	/**
	 * UI notifying a note was created
	 * Persist the note and notify UI with resulting ID
	 */
	listeners.push({ query: "individualNotesAdd", callback: (data) => {
		const response = database.transaction(['notes'], 'readwrite').objectStore('notes').add({ individual: data.individual, title: data.title, content: data.content, author: data.author, date: data.date })
		response.addEventListener("success", event => {
			self.postMessage({ query: "individualNotesAdded", data: { id: data.id, offlineId: event.target.result, individual: data.individual } })
		})
	}})

	/**
	 * UI notifying a note was updated
	 * Update the note entry
	 */
	listeners.push({ query: "individualNotesUpdate", callback: data => {
		database.transaction(['notes'], 'readwrite').objectStore('notes').put(data)
	}})

	/**
	 * UI notifying a note was removed
	 * Remove the note entry
	 */
	listeners.push({ query: "individualNotesRemove", callback: data => {
		database.transaction(['notes'], 'readwrite').objectStore('notes').delete(data.offlineId)
	}})

}
