/**
 * @module indexeddb-local/relationships
 * Propagate UI actions related to relationships to the IndexedDB persistence layer through events
 */
export default properties => {

	const { geneatree, worker, listeners } = properties

	/**
	 * Local notifying that it has stored a relationship and is giving us its local ID.
	 * We set the offlineId accordingly
	 */
	listeners.push({ query: "relationshipAdded", callback: data => {
		// const tree = geneatree.trees.list.find(tree => tree.individuals.find(individual => individual.offlineId === data.individual))
		// const individual = tree.individuals.find(individual => individual.offlineId === data.individual)
		// const note = individual.notes.find(note => note.id === data.id)
		// note.offlineId = data.offlineId
	}})

	/**
	 * UI notifying that a relationship was added
	 * Notify local persistence
	 */
	geneatree.trees.listen("relationshipAdded", data => {
		console.log("relationshipAdded", data)
	})

}
