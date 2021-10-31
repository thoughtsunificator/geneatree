export default properties => {

	const { listeners, database } = properties

	listeners.push({ query: "tree add", callback: (data) => {
		const { id, ...data_ } = data
		const response = database.transaction(['trees'], 'readwrite').objectStore('trees').add(data_)
		response.addEventListener("success", event => {
			self.postMessage({ query: "tree added", data: { id, offlineId: event.target.result } })
		})
	}})

	listeners.push({ query: "tree update", callback: data => {
		database.transaction(['trees'], 'readwrite').objectStore('trees').put(data)
	}})

	listeners.push({ query: "tree remove", callback: data => {
		database.transaction(['trees'], 'readwrite').objectStore('trees').delete(data.offlineId)
	}})

}
