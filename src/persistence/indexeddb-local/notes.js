export default properties => {

	const { geneatree, worker, listeners } = properties

	listeners.push({ query: "individual notes added", callback: data => {
		const tree = geneatree.trees.find(tree => tree.individuals.find(individual => individual.offlineId === data.individual))
		const individual = tree.individuals.find(individual => individual.offlineId === data.individual)
		const note = individual.notes.find(note => note.id === data.id)
		note.offlineId = data.offlineId
	}})

	geneatree.listen("individual notes added", data => {
		if(data.offlineId === -1 && data.networkId === -1) {
			worker.postMessage({ query: "individual notes add", data: { id: data.id, individual: data.individual.offlineId, title: data.title, content: data.content, author: data.author, date: data.date } })
		}
	})

	geneatree.listen("individual notes updated", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "individual notes update", data: { id: data.note.offlineId, ...data.form, individual: data.note.individual.offlineId, date: data.note.date } })
		}
	})

	geneatree.listen("individual notes removed", data => {
		if(data.offlineId !== -1) {
			worker.postMessage({ query: "individual notes remove", data: { offlineId: data.offlineId } })
		}
	})


}
