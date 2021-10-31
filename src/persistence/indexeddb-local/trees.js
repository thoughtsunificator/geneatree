export default properties => {

	const { geneatree, worker, listeners } = properties

	listeners.push({ query: "trees load", callback: data => {
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
			geneatree.emit("tree add", [{ id: tree.id, type: "offline", meta: tree.meta }, tree.individuals])
		}
		geneatree.emit("indexeddb trees loaded")
	}})

	listeners.push({ query: "tree added", callback: data => {
		const tree = geneatree.trees.find(tree => tree.id === data.id)
		tree.offlineId = data.offlineId
		worker.postMessage({ query: "individual add", data: { id: tree.individuals[0].id, tree: tree.offlineId, meta: tree.individuals[0].meta, cellX: tree.individuals[0].cellX, cellY: tree.individuals[0].cellY } })
	}})

	geneatree.listen("tree added", data => {
		if(data.offlineId === -1 && data.networkId === -1) {
			worker.postMessage({ query: "tree add", data: { meta: data.meta, id: data.id } })
		}
	})

	geneatree.listen("tree updated", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "tree update", data: { id: data.tree.offlineId, meta: data.form } })
		}
	})

	geneatree.listen("tree removed", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "tree remove", data: { offlineId: data.offlineId } })
		}
	})

}
