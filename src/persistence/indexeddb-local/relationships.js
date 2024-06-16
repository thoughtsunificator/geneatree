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
		const tree = geneatree.trees.list.find(tree => tree.relationships.find(relationship => relationship.offlineId === data.relationship))
		const relationship = tree.relationships.find(relationship => relationship.offlineId === data.relationship)
		relationship.offlineId = data.offlineId
	}})

	/**
	 * UI notifying that a relationship was added
	 * Notify local persistence
	 */
	geneatree.trees.listen("relationshipAdded", data => {
		if(data.offlineId === -1 && data.networkId === -1) {
			console.log({ id: data.id, type: data.type, relationshipIndividual1: data.relationshipIndividual1, relationshipIndividual2: data.relationshipIndividual2, meta: data.meta })
			worker.postMessage({ query: "relationshipAdd", data: {
				id: data.id,
				type: data.type,
				relationshipIndividual1: { role: data.relationshipIndividual1.role, individual: data.relationshipIndividual1.individual.offlineId },
				relationshipIndividual2: { role: data.relationshipIndividual2.role, individual: data.relationshipIndividual2.individual.offlineId },
				meta: data.meta
			} })
		}
	})

}
