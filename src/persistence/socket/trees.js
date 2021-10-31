export default properties => {

	const { geneatree, socket, listeners } = properties

	listeners.push({ query: "trees load", callback: data => {
		const trees = data.trees.map(tree => {
			tree.individuals = data.individuals.filter(individual => individual.tree.toString() === tree._id.toString())
			tree.individuals = tree.individuals.map(individual => {
				individual.notes = data.notes.filter(note => note.individual.toString() === individual._id.toString())
				return individual
			})
			return tree
		})
		for(const tree of trees) {
			tree.individuals[0].networkId = tree.individuals[0]._id
			geneatree.emit("tree add", [{ type: "online", _id: tree._id, meta: tree.meta }, tree.individuals])
		}
		geneatree.emit("socket trees loaded")
	}})

	listeners.push({ query: "tree added", callback: data => {
		const tree = geneatree.trees.find(tree => tree.id === data.id)
		tree.networkId = data.networkId
		if(socket.readyState === 1) {
			socket.send(JSON.stringify({ query: "individual add", data: { id: tree.individuals[0].id, tree: tree.networkId, meta: tree.individuals[0].meta, cellX: tree.individuals[0].cellX, cellY: tree.individuals[0].cellY } }))
		}
	}})

	geneatree.listen("tree added", data => {
		if(socket.readyState === 1 && data.networkId === -1 && data.offlineId === -1) {
			socket.send(JSON.stringify({ query: "tree add", data: { meta: data.meta, id: data.id } }))
		}
	})

	geneatree.listen("tree updated", data => {
		if(socket.readyState === 1) {
			socket.send(JSON.stringify({ query: "tree update", data: { networkId: data.tree.networkId, form: data.form } }))
		}
	})

	geneatree.listen("tree removed", data => {
		if(socket.readyState === 1) {
			socket.send(JSON.stringify({ query: "tree remove", data: { networkId: data.networkId } }))
		}
	})

}
