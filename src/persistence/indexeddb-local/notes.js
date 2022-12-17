export default properties => {

	const { geneatree, worker, listeners } = properties

	listeners.push({ query: "individualNotesAdded", callback: data => {
		const tree = geneatree.trees.list.find(tree => tree.individuals.find(individual => individual.offlineId === data.individual))
		const individual = tree.individuals.find(individual => individual.offlineId === data.individual)
		const note = individual.notes.find(note => note.id === data.id)
		note.offlineId = data.offlineId
	}})

	geneatree.listen("individualNotesAdded", data => {
		if(data.offlineId === -1 && data.networkId === -1) {
			worker.postMessage({ query: "individualNotesAdd", data: { id: data.id, individual: data.individual.offlineId, title: data.title, content: data.content, author: data.author, date: data.date } })
		}
	})

	geneatree.listen("individualNotesUpdated", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "individualNotesUpdate", data: { id: data.note.offlineId, ...data.form, individual: data.note.individual.offlineId, date: data.note.date } })
		}
	})

	geneatree.listen("individualNotesRemoved", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "individualNotesRemove", data: { offlineId: data.offlineId } })
		}
	})


}
