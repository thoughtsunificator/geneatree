export default properties => {

	const { listeners, database } = properties

	listeners.push({ query: "individual notes add", callback: (data) => {
		const response = database.transaction(['notes'], 'readwrite').objectStore('notes').add({ individual: data.individual, title: data.title, content: data.content, author: data.author, date: data.date })
		response.addEventListener("success", event => {
			self.postMessage({ query: "individual notes added", data: { id: data.id, offlineId: event.target.result, individual: data.individual } })
		})
	}})

	listeners.push({ query: "individual notes update", callback: data => {
		database.transaction(['notes'], 'readwrite').objectStore('notes').put(data)
	}})

	listeners.push({ query: "individual notes remove", callback: data => {
		database.transaction(['notes'], 'readwrite').objectStore('notes').delete(data.offlineId)
	}})

}
