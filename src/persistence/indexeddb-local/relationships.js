/**
 * @module indexeddb-local/relationships
 * Propagate UI actions related to relationships to the IndexedDB persistence layer through events
 */
export default properties => {

	const { geneatree, worker, listeners } = properties

	listeners.push({ query: "relationshipAdded", callback: data => {
		// const tree = geneatree.trees.list.find(tree => tree.individuals.find(individual => individual.offlineId === data.individual))
		// const individual = tree.individuals.find(individual => individual.offlineId === data.individual)
		// const note = individual.notes.find(note => note.id === data.id)
		// note.offlineId = data.offlineId
	}})

	geneatree.trees.listen("relationshipAdded", data => {
		console.log("relationshipAdded", data)
	})

}
