export default properties => {

	const { geneatree, worker, listeners } = properties

	geneatree.listen("persistence indexeddb clear", data => {
		worker.postMessage({ query: "clear" })
	})

}
