export default properties => {

	const { geneatree, socket, listeners } = properties

	listeners.push({ query: "individual notes added", callback: data => {
		const tree = geneatree.trees.find(tree => tree.individuals.find(individual => individual.networkId === data.individual))
		const individual = tree.individuals.find(individual => individual.networkId === data.individual)
		const note = individual.notes.find(note => note.id === data.id)
		note.networkId = data.networkId
	}})

	geneatree.listen("individual notes added", data => {
		if(socket.readyState === 1 && data.networkId === -1 && data.offlineId === -1) {
			socket.send(JSON.stringify({ query: "individual notes add", data: { id: data.id, individual: data.individual.networkId, title: data.title, content: data.content, author: data.author, date: data.date } }))
		}
	})

	geneatree.listen("individual notes updated", data => {
		if(socket.readyState === 1 && data.networkId !== -1) {
			socket.send(JSON.stringify({ query: "individual notes update", data: { networkId: data.note.networkId, form : data.form } }))
		}
	})

	geneatree.listen("individual notes removed", data => {
		if(socket.readyState === 1 && data.networkId !== -1) {
			socket.send(JSON.stringify({ query: "individual notes remove", data: { networkId: data.networkId } }))
		}
	})

}
