/**
 * @module socket/individual
 * Propagate UI actions related to notes to the Remote persistence layer through events
 */
export default properties => {

	const { geneatree, socket, listeners } = properties

	/**
	 * Remote notifying that it has stored a note and is giving us its remote ID.
	 * We set the networkId accordingly
	 */
	listeners.push({ query: "individualNotesAdded", callback: data => {
		const tree = geneatree.trees.list.find(tree => tree.individuals.find(individual => individual.networkId === data.individual))
		const individual = tree.individuals.find(individual => individual.networkId === data.individual)
		const note = individual.notes.find(note => note.id === data.id)
		note.networkId = data.networkId
	}})

	/**
	 * UI notifying that a note was created
	 * Notify remote persistence
	 */
	geneatree.individuals.listen("notesAdded", data => {
		if(socket.readyState === 1 && data.networkId === -1 && data.offlineId === -1) {
			socket.send(JSON.stringify({ query: "individualNotesAdd", data: { id: data.id, individual: data.individual.networkId, title: data.title, content: data.content, author: data.author, date: data.date } }))
		}
	})

	/**
	 * UI notifying that a note was updated
	 * Notify remote persistence
	 */
	geneatree.individuals.listen("notesUpdated", data => {
		if(socket.readyState === 1 && data.networkId !== -1) {
			socket.send(JSON.stringify({ query: "individualNotesUpdate", data: { networkId: data.note.networkId, form : data.form } }))
		}
	})

	/**
	 * UI notifying that a note was removed
	 * Notify remote persistence
	 */
	geneatree.individuals.listen("notesRemoved", data => {
		if(socket.readyState === 1 && data.networkId !== -1) {
			socket.send(JSON.stringify({ query: "individualNotesRemove", data: { networkId: data.networkId } }))
		}
	})

}
