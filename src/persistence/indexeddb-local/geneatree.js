export default properties => {

	const { geneatree, worker, listeners } = properties

	geneatree.listen("persistenceIndexeddbClear", data => {
		worker.postMessage({ query: "clear" })
	})

	listeners.push({ query: "clearSuccess", callback: data => {
		geneatree.emit("reboot", { text: "IndexedDB cleared", type: "info", duration: 2500 })
	}})
	
	listeners.push({ query: "clearError", callback: data => {
		geneatree.emit("osdSet", { text: "Could not clear IndexedDB", type: "info", duration: 2500 })
	}})

}
