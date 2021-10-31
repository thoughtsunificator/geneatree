export default properties => {

	const { geneatree, worker, listeners } = properties

	listeners.push({ query: "log", callback: data => {
		geneatree.emit("log", data)
	}})

}
