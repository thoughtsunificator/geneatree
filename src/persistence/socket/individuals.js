export default properties => {

	const { geneatree, socket, listeners } = properties

	listeners.push({ query: "individual added", callback: data => {
		const tree = geneatree.trees.find(tree => tree.networkId === data.tree)
		const individual = tree.individuals.find(individual => individual.id === data.id)
		individual.networkId = data.networkId
	}})

	geneatree.listen("individual added", data => {
		if(socket.readyState === 1 && data.networkId === -1 && data.offlineId === -1) {
			socket.send(JSON.stringify({ query: "individual add", data: { id: data.id, tree: data.tree.networkId, meta: data.meta, cellX: data.cellX, cellY: data.cellY } }))
		}
	})

	geneatree.listen("individual updated", data => {
		if(socket.readyState === 1 && data.networkId !== -1) {
			socket.send(JSON.stringify({ query: "individual update", data: { networkId: data.individual.networkId, form : data.form, tree: data.individual.tree.networkId } }))
		}
	})

	geneatree.listen("individual removed", data => {
		if(socket.readyState === 1 && data.networkId !== -1) {
			socket.send(JSON.stringify({ query: "individual remove", data: { networkId: data.networkId, tree: data.tree.networkId } }))
		}
	})

}
