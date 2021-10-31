export default properties => {

	const { listeners, database } = properties

	listeners.push({ query: "individual add", callback: (data) => {
		const { id, ...data_ } = data
		const response = database.transaction(['individuals'], 'readwrite').objectStore('individuals').add(data_)
		response.addEventListener("success", event => {
			self.postMessage({ query: "individual added", data: { id, offlineId: event.target.result, tree: data.tree } })
		})
	}})

	listeners.push({ query: "individual update", callback: data => {
		database.transaction(['individuals'], 'readwrite').objectStore('individuals').put(data)
	}})

	listeners.push({ query: "individual remove", callback: data => {
		database.transaction(['individuals'], 'readwrite').objectStore('individuals').delete(data.offlineId)
	}})


}
