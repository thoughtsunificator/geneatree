export default properties => {

	const { geneatree, socket, listeners } = properties

	listeners.push({ query: "individualNotesAdded", callback: data => {
		const tree = geneatree.trees.list.find(tree => tree.individuals.find(individual => individual.networkId === data.individual))
		const individual = tree.individuals.find(individual => individual.networkId === data.individual)
		const note = individual.notes.find(note => note.id === data.id)
		note.networkId = data.networkId
	}})

	geneatree.listen("individualNotesAdded", data => {
		if(socket.readyState === 1 && data.networkId === -1 && data.offlineId === -1) {
			socket.send(JSON.stringify({ query: "individualNotesAadd", data: { id: data.id, individual: data.individual.networkId, title: data.title, content: data.content, author: data.author, date: data.date } }))
		}
	})

	geneatree.listen("individualNotesUpdated", data => {
		if(socket.readyState === 1 && data.networkId !== -1) {
			socket.send(JSON.stringify({ query: "individualNotesUpdate", data: { networkId: data.note.networkId, form : data.form } }))
		}
	})

	geneatree.listen("individualNotesRemoved", data => {
		if(socket.readyState === 1 && data.networkId !== -1) {
			socket.send(JSON.stringify({ query: "individualNotesRemove", data: { networkId: data.networkId } }))
		}
	})

}
