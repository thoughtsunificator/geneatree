export default properties => {

	const { geneatree, socket, listeners } = properties

	listeners.push({ query: "treeAdded", callback: data => {
		const tree = geneatree.trees.list.find(tree => tree.id === data.id)
		tree.networkId = data.networkId
		if(socket.readyState === 1) {
			socket.send(JSON.stringify({ query: "individualAdd", data: { id: tree.individuals[0].id, tree: tree.networkId, meta: tree.individuals[0].meta, cellX: tree.individuals[0].cellX, cellY: tree.individuals[0].cellY } }))
		}
	}})

	geneatree.trees.listen("added", data => {
		if(socket.readyState === 1 && data.networkId === -1 && data.offlineId === -1) {
			socket.send(JSON.stringify({ query: "treeAdd", data: { meta: data.meta, id: data.id } }))
		}
	})

	geneatree.trees.listen("updated", data => {
		if(socket.readyState === 1) {
			socket.send(JSON.stringify({ query: "treeUpdate", data: { networkId: data.tree.networkId, form: data.form } }))
		}
	})

	geneatree.trees.listen("removed", data => {
		if(socket.readyState === 1) {
			socket.send(JSON.stringify({ query: "treeRemove", data: { networkId: data.networkId } }))
		}
	})

}
