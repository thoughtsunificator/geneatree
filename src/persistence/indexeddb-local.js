import App from "./indexeddb-local/app.js"
import Geneatree from "./indexeddb-local/geneatree.js"
import Trees from "./indexeddb-local/trees.js"
import Individuals from "./indexeddb-local/individuals.js"
import Notes from "./indexeddb-local/notes.js"

import Log from "../object/log.js"

export default properties => {

	const { geneatree } = properties

	geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: "[persistence:indexeddb-local] Loaded" })

	const workerURL = new URL("./indexeddb-remote.js", import.meta.url)

	const worker = new Worker(workerURL, { type: "module" }) // FIXME Imports won't work inside d: https://bugzilla.mozilla.org/show_bug.cgi?id=1247687

	const listeners = []

	const properties_ = { ...properties, worker, listeners }

	App(properties_)
	Geneatree(properties_)
	Trees(properties_)
	Individuals(properties_)
	Notes(properties_)

	worker.addEventListener("message", event => {
		const { query, data } = event.data

		geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: `[persistence:indexeddb-local] Received query: ${query}`, data })

		const listeners_ = listeners.filter(listener => listener.query === query)

		if(listeners_.length >= 1) {
			listeners_.forEach(listener => listener.callback(data))
		} else {
			geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: `[persistence:indexeddb-local] Unrecognized query: ${query}` })
		}
	})

	worker.addEventListener("error", event => {
		geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: "[persistence:indexeddb-local] An error occured", event })
	})



}
