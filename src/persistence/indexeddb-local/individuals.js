export default properties => {

	const { geneatree, worker, listeners } = properties

	listeners.push({ query: "individualAdded", callback: data => {
		const tree = geneatree.trees.list.find(tree => tree.offlineId === data.tree)
		const individual = tree.individuals.find(individual => individual.id === data.id)
		individual.offlineId = data.offlineId
	}})

	geneatree.individuals.listen("added", data => {
		if(data.offlineId === -1 && data.networkId === -1) {
			worker.postMessage({ query: "individualAdd", data: { id: data.id, tree: data.tree.offlineId, meta: data.meta, cellX: data.cellX, cellY: data.cellY } })
		}
	})

	geneatree.individuals.listen("updated", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "individualUpdate", data: { id: data.individual.offlineId, tree: data.individual.tree.offlineId, meta: data.form, x: data.individual.cellX, y: data.individual.cellY } })
		}
	})

	geneatree.individuals.listen("removed", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "individualRemove", data: { offlineId: data.offlineId, tree: data.tree.offlineId } })
		}
	})


}
