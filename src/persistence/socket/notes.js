export default properties => {

	const { geneatree, socket, listeners } = properties

	listeners.push({ query: "individualNotesAdded", callback: data => {
		const tree = geneatree.trees.list.find(tree => tree.individuals.find(individual => individual.networkId === data.individual))
		const individual = tree.individuals.find(individual => individual.networkId === data.individual)
		const note = individual.notes.find(note => note.id === data.id)
		note.networkId = data.networkId
	}})

	geneatree.individuals.listen("notesAdded", data => {
		if(socket.readyState === 1 && data.networkId === -1 && data.offlineId === -1) {
			socket.send(JSON.stringify({ query: "individualNotesAdd", data: { id: data.id, individual: data.individual.networkId, title: data.title, content: data.content, author: data.author, date: data.date } }))
		}
	})

	geneatree.individuals.listen("notesUpdated", data => {
		if(socket.readyState === 1 && data.networkId !== -1) {
			socket.send(JSON.stringify({ query: "individualNotesUpdate", data: { networkId: data.note.networkId, form : data.form } }))
		}
	})

	geneatree.individuals.listen("notesRemoved", data => {
		if(socket.readyState === 1 && data.networkId !== -1) {
			socket.send(JSON.stringify({ query: "individualNotesRemove", data: { networkId: data.networkId } }))
		}
	})

}
