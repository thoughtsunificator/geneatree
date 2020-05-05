/**
 * @module socket/individual
 * Propagate UI actions related to trees to the Remote persistence layer through events
 */
export default properties => {

	const { geneatree, socket, listeners } = properties

	/**
	 * Remote notifying that it has stored a tree and is giving us its remote ID.
	 * We set the networkId accordingly
	 */
	listeners.push({ query: "treeAdded", callback: data => {
		const tree = geneatree.trees.list.find(tree => tree.id === data.id)
		tree.networkId = data.networkId
		if(socket.readyState === 1) {
			socket.send(JSON.stringify({ query: "individualAdd", data: { id: tree.individuals[0].id, tree: tree.networkId, meta: tree.individuals[0].meta } }))
		}
	}})

	/**
	 * UI notifying that a tree was created
	 * Notify remote persistence
	 */
	geneatree.trees.listen("added", data => {
		if(socket.readyState === 1 && data.networkId === -1 && data.offlineId === -1) {
			socket.send(JSON.stringify({ query: "treeAdd", data: { meta: data.meta, id: data.id } }))
		}
	})

	/**
	 * UI notifying that a tree was updated
	 * Notify remote persistence
	 */
	geneatree.trees.listen("updated", data => {
		if(socket.readyState === 1) {
			socket.send(JSON.stringify({ query: "treeUpdate", data: { networkId: data.tree.networkId, form: data.form } }))
		}
	})

	/**
	 * UI notifying that a tree was removed
	 * Notify remote persistence
	 */
	geneatree.trees.listen("removed", data => {
		if(socket.readyState === 1) {
			socket.send(JSON.stringify({ query: "treeRemove", data: { networkId: data.networkId } }))
		}
	})

}
