export default properties => {

	const { listeners, database } = properties

	listeners.push({ query: "clear", callback: (data) => {
		const request = indexedDB.deleteDatabase(database.name)
		request.addEventListener("success", event => {
			self.postMessage({ query: "clearSuccess" })
		})
		request.addEventListener("error", event => {
			self.postMessage({ query: "clearError" })
		})
	}})


}
