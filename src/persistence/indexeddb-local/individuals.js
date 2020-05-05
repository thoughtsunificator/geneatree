/**
 * @module indexeddb-local/individuals
 * Propagate UI actions related to individuals to the IndexedDB persistence layer through events
 */
export default properties => {

	const { geneatree, worker, listeners } = properties

	/**
	 * Local notifying that it has stored an individual and is giving us its local ID.
	 * We set the offlineId accordingly
	 */
	listeners.push({ query: "individualAdded", callback: data => {
		const tree = geneatree.trees.list.find(tree => tree.offlineId === data.tree)
		const individual = tree.individuals.find(individual => individual.id === data.id)
		individual.offlineId = data.offlineId
	}})

	/**
	 * UI notifying that an individual was created
	 * Notify local persistence
	 */
	geneatree.individuals.listen("added", data => {
		if(data.offlineId === -1 && data.networkId === -1) {
			worker.postMessage({ query: "individualAdd", data: { id: data.id, tree: data.tree.offlineId, meta: data.meta } })
		}
	})

	/**
	 * UI notifying that an individual was updated
	 * Notify local persistence
	 */
	geneatree.individuals.listen("updated", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "individualUpdate", data: { id: data.individual.offlineId, tree: data.individual.tree.offlineId, meta: data.form } })
		}
	})

	/**
	 * UI notifying that an individual was removed
	 * Notify local persistence
	 */
	geneatree.individuals.listen("removed", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "individualRemove", data: { offlineId: data.offlineId, tree: data.tree.offlineId } })
		}
	})

}
