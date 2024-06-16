/**
 * @module indexeddb-local/trees
 * Propagate UI actions related to trees to the IndexedDB persistence layer through events
 */
export default properties => {

	const { geneatree, worker, listeners } = properties

	/**
	 * Local notifying that it has stored a tree and is giving us its local ID.
	 * We set the offlineId accordingly
	 */
	listeners.push({ query: "treeAdded", callback: data => {
		const tree = geneatree.trees.list.find(tree => tree.id === data.id)
		tree.offlineId = data.offlineId
		worker.postMessage({ query: "individualAdd", data: { id: tree.individuals[0].id, tree: tree.offlineId, meta: tree.individuals[0].meta, cellX: tree.individuals[0].cellX, cellY: tree.individuals[0].cellY } })
	}})

	/**
	 * UI notifying that a tree was added
	 * Notify local persistence
	 */
	geneatree.trees.listen("added", data => {
		if(data.offlineId === -1 && data.networkId === -1) {
			worker.postMessage({ query: "treeAdd", data: { meta: data.meta, id: data.id } })
		}
	})

	/**
	 * UI notifying that a tree was updated
	 * Notify local persistence
	 */
	geneatree.trees.listen("updated", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "treeUpdate", data: { id: data.tree.offlineId, meta: data.form } })
		}
	})

	/**
	 * UI notifying that a tree was removed
	 * Notify local persistence
	 */
	geneatree.trees.listen("removed", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "treeRemove", data: { offlineId: data.offlineId } })
		}
	})

}
