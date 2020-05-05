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
		const tree = geneatree.trees.list.find(tree => tree.relationships.find(relationship => relationship.id === data.id))
		const relationship = tree.relationships.find(relationship => relationship.id === data.id)
		relationship.offlineId = data.offlineId
	}})

	/**
	 * UI notifying that a relationship was added
	 * Notify local persistence
	 */
	geneatree.trees.listen("relationshipAdded", data => {
		worker.postMessage({ query: "relationshipAdd", data: {
			id: data.id,
			type: data.type,
			relationshipIndividuals: data.relationshipIndividuals.map(relationshipIndividual => ({ role: relationshipIndividual.role, individual: relationshipIndividual.individual.offlineId })),
			meta: data.meta,
			tree: data.relationshipIndividuals[0].individual.tree.offlineId
		} })
	})

}
