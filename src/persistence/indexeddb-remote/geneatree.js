import config from ":config"

export default properties => {

	const { listeners, database } = properties

	listeners.push({ query: "clear", callback: (data) => {
		indexedDB.deleteDatabase(config.INDEXEDDB_DATABASE_NAME)
	}})


}
