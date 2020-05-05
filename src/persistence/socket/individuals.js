/**
 * @module socket/individual
 * Propagate UI actions related to individuals to the Remote persistence layer through events
 */
export default properties => {

	const { geneatree, socket, listeners } = properties

	/**
	 * Remote notifying that it has stored an individual and is giving us its remote ID.
	 * We set the networkId accordingly
	 */
	listeners.push({ query: "individualAdded", callback: data => {
		const tree = geneatree.trees.list.find(tree => tree.networkId === data.tree)
		const individual = tree.individuals.find(individual => individual.id === data.id)
		individual.networkId = data.networkId
	}})

	/**
	 * UI notifying that an individual was created
	 * Notify remote persistence
	 */
	geneatree.individuals.listen("added", data => {
		if(socket.readyState === 1 && data.networkId === -1 && data.offlineId === -1) {
			socket.send(JSON.stringify({ query: "individualAdd", data: { id: data.id, tree: data.tree.networkId, meta: data.meta } }))
		}
	})

	/**
	 * UI notifying that an individual was updated
	 * Notify remote persistence
	 */
	geneatree.individuals.listen("updated", data => {
		if(socket.readyState === 1 && data.networkId !== -1) {
			socket.send(JSON.stringify({ query: "individualUpdate", data: { networkId: data.individual.networkId, form : data.form, tree: data.individual.tree.networkId } }))
		}
	})

	/**
	 * UI notifying that an individual was removed
	 * Notify remote persistence
	 */
	geneatree.individuals.listen("removed", data => {
		if(socket.readyState === 1 && data.networkId !== -1) {
			socket.send(JSON.stringify({ query: "individualRemove", data: { networkId: data.networkId, tree: data.tree.networkId } }))
		}
	})

}
