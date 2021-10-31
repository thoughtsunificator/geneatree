export default properties => {

	const { geneatree, worker, listeners } = properties

	listeners.push({ query: "individual added", callback: data => {
		const tree = geneatree.trees.find(tree => tree.offlineId === data.tree)
		const individual = tree.individuals.find(individual => individual.id === data.id)
		individual.offlineId = data.offlineId
	}})

	geneatree.listen("individual added", data => {
		if(data.offlineId === -1 && data.networkId === -1) {
			worker.postMessage({ query: "individual add", data: { id: data.id, tree: data.tree.offlineId, meta: data.meta, cellX: data.cellX, cellY: data.cellY } })
		}
	})

	geneatree.listen("individual updated", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "individual update", data: { id: data.individual.offlineId, tree: data.individual.tree.offlineId, meta: data.form, x: data.individual.cellX, y: data.individual.cellY } })
		}
	})

	geneatree.listen("individual removed", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "individual remove", data: { offlineId: data.offlineId, tree: data.tree.offlineId } })
		}
	})


}
