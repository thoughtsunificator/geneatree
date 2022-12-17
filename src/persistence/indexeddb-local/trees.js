export default properties => {

	const { geneatree, worker, listeners } = properties

	listeners.push({ query: "treesLoad", callback: data => {
		const trees = data.trees.map(tree => {
			tree.individuals = data.individuals.filter(individual => individual.tree.toString() === tree.id.toString())
			tree.individuals = tree.individuals.map(individual => {
				individual.notes = data.notes.filter(note => note.individual.toString() === individual.id.toString())
				return individual
			})
			return tree
		})
		for(const tree of trees) {
			tree.individuals[0].offlineId = tree.individuals[0].id
			geneatree.trees.emit("add", [{ id: tree.id, type: "offline", meta: tree.meta }, tree.individuals])
		}
		geneatree.emit("indexeddbTreesLoaded")
	}})

	listeners.push({ query: "treeAdded", callback: data => {
		const tree = geneatree.trees.list.find(tree => tree.id === data.id)
		tree.offlineId = data.offlineId
		worker.postMessage({ query: "individualAdd", data: { id: tree.individuals[0].id, tree: tree.offlineId, meta: tree.individuals[0].meta, cellX: tree.individuals[0].cellX, cellY: tree.individuals[0].cellY } })
	}})

	geneatree.trees.listen("added", data => {
		if(data.offlineId === -1 && data.networkId === -1) {
			worker.postMessage({ query: "treeAdd", data: { meta: data.meta, id: data.id } })
		}
	})

	geneatree.trees.listen("updated", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "treeUpdate", data: { id: data.tree.offlineId, meta: data.form } })
		}
	})

	geneatree.trees.listen("removed", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "treeRemove", data: { offlineId: data.offlineId } })
		}
	})

}
