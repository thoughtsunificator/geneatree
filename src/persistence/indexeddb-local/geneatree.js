export default properties => {

	const { geneatree, worker, listeners } = properties

	geneatree.listen("persistenceIndexeddbClear", data => {
		worker.postMessage({ query: "clear" })
	})

}
