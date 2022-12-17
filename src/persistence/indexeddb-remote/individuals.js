export default properties => {

	const { listeners, database } = properties

	listeners.push({ query: "individualAdd", callback: (data) => {
		const { id, ...data_ } = data
		const response = database.transaction(['individuals'], 'readwrite').objectStore('individuals').add(data_)
		response.addEventListener("success", event => {
			self.postMessage({ query: "individualAdded", data: { id, offlineId: event.target.result, tree: data.tree } })
		})
	}})

	listeners.push({ query: "individualUpdate", callback: data => {
		database.transaction(['individuals'], 'readwrite').objectStore('individuals').put(data)
	}})

	listeners.push({ query: "individualRemove", callback: data => {
		database.transaction(['individuals'], 'readwrite').objectStore('individuals').delete(data.offlineId)
	}})


}
