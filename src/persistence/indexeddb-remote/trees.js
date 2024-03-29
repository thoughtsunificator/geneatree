export default properties => {

	const { listeners, database } = properties

	listeners.push({ query: "treeAdd", callback: (data) => {
		const { id, ...data_ } = data
		const response = database.transaction(['trees'], 'readwrite').objectStore('trees').add(data_)
		response.addEventListener("success", event => {
			self.postMessage({ query: "treeAdded", data: { id, offlineId: event.target.result } })
		})
	}})

	listeners.push({ query: "treeUpdate", callback: data => {
		database.transaction(['trees'], 'readwrite').objectStore('trees').put(data)
	}})

	listeners.push({ query: "treeRemove", callback: data => {
		database.transaction(['trees'], 'readwrite').objectStore('trees').delete(data.offlineId)
	}})

}
