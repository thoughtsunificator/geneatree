/**
 * @module indexeddb-local/notes
 * Propagate UI actions related to notes to the IndexedDB persistence layer through events
 */
export default properties => {

	const { geneatree, worker, listeners } = properties

	/**
	 * Local notifying that it has stored a note and is giving us its local ID.
	 * We set the offlineId accordingly
	 */
	listeners.push({ query: "individualNotesAdded", callback: data => {
		const tree = geneatree.trees.list.find(tree => tree.individuals.find(individual => individual.offlineId === data.individual))
		const individual = tree.individuals.find(individual => individual.offlineId === data.individual) // data.individual == individual.offlineId
		const note = individual.notes.find(note => note.id === data.id)
		note.offlineId = data.offlineId
	}})

	/**
	 * UI notifying that a note was added
	 * Notify local persistence
	 */
	geneatree.individuals.listen("notesAdded", data => {
		if(data.offlineId === -1 && data.networkId === -1) {
			worker.postMessage({ query: "individualNotesAdd", data: { id: data.id, individual: data.individual.offlineId, title: data.title, content: data.content, author: data.author, date: data.date } })
		}
	})

	/**
	 * UI notifying that a note was updated
	 * Notify local persistence
	 */
	geneatree.individuals.listen("notesUpdated", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "individualNotesUpdate", data: { id: data.note.offlineId, ...data.form, individual: data.note.individual.offlineId, date: data.note.date } })
		}
	})

	/**
	 * UI notifying that a note was removed
	 * Notify local persistence
	 */
	geneatree.individuals.listen("notesRemoved", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "individualNotesRemove", data: { offlineId: data.offlineId } })
		}
	})


}
