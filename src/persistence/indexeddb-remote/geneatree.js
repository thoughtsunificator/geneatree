export default properties => {

	const { listeners, database } = properties

	listeners.push({ query: "clear", callback: (data) => {
		indexedDB.deleteDatabase(window.INDEXEDDB_DATABASE_NAME)
	}})


}
