/**
 * @module socket
 * Middleware between UI and Remote persistence layer.
 * Propagate UI actions to the Remote persistence layer through events
 */
import Trees from "./socket/trees.js"
import Individuals from "./socket/individuals.js"
import Notes from "./socket/notes.js"

import Log from "../object/log.js"

export const SOCKET_STATE_INITIAL = "SOCKET_STATE_INITIAL"
const SOCKET_STATE_CONNECTING = "SOCKET_STATE_CONNECTING"
const SOCKET_STATE_CONNECTED = "SOCKET_STATE_CONNECTED"
const SOCKET_STATE_DISCONNECTED = "SOCKET_STATE_DISCONNECTED"

/**
 * Connect to remote and initialize event listeners
 */
function connect(properties) {

	const { geneatree } = properties

	geneatree.emit("osdSet", { text: "Connecting to remote persistence layer...", type: "info" })

	geneatree.emit("log", { type: Log.TYPE.INFO, message: `Connecting to remote persistence layer...` })
	geneatree.emit("log", { type: Log.TYPE.DEBUG, message: `[persistence:socket] Connecting...` })

	geneatree.socketState = SOCKET_STATE_CONNECTING
	const socket = new WebSocket(window.SOCKET_URL)

	const listeners = []

	const properties_ = { ...properties, socket, listeners }

	Trees(properties_)
	Individuals(properties_)
	Notes(properties_)

	listeners.push({ query: "load", callback: data => {
		geneatree.emit("osdSet", { text: "Connected to remote persistence layer", type: "valid" })
		const listenerIndex = listeners.findIndex(listener => listener.query === "initialized")
		listeners.splice(listenerIndex, 1)
		const trees = data.trees.map(tree => {
			tree.individuals = data.individuals.filter(individual => individual.tree.toString() === tree._id.toString())
			tree.individuals = tree.individuals.map(individual => {
				individual.notes = data.notes.filter(note => note.individual.toString() === individual._id.toString())
				return individual
			})
			return tree
		})
		for(const tree of trees) {
			tree.individuals[0].networkId = tree.individuals[0]._id
			geneatree.trees.emit("add", [{ type: "online", _id: tree._id, meta: tree.meta }, tree.individuals])
		}
		geneatree.emit("socketTLoaded")
	}})

	socket.addEventListener('message', event => {
		const { query, data } = JSON.parse(event.data)

		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: `[persistence:socket] Received query: ${query}`, data })

		const listeners_ = listeners.filter(socketListener => socketListener.query === query)

		if(listeners_.length >= 1) {
			listeners_.forEach(socketListener => socketListener.callback(data))
		} else {
			geneatree.emit("log", { type: Log.TYPE.DEBUG, message: `[persistence:socket] Unknown query: ${query}` })
		}
	})

	socket.addEventListener("open", () => {
		geneatree.socketState = SOCKET_STATE_CONNECTED
		geneatree.emit("log", { type: Log.TYPE.INFO, message: `Connected to remote persistence layer` })
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[persistence:socket] Connected" })
	})

	socket.addEventListener("error", event => {
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[persistence:socket] An error occured", data: event })
		if(geneatree.socketState === SOCKET_STATE_CONNECTED) {
			geneatree.emit("log", { type: Log.TYPE.ERROR, message: `Disconnected from remote` })
			geneatree.emit("osdSet", { text: "Disconnected from remote", type: "info" })
		} else if(geneatree.socketState === SOCKET_STATE_CONNECTING) {
			geneatree.emit("log", { type: Log.TYPE.ERROR, message: `Failed to connect to remote persistence layer` })
			geneatree.emit("osdSet", { text: "Failed to connect to remote persistence layer",  type: "error" })
		}
	})

	socket.addEventListener("close", () => {
		if(geneatree.socketState === SOCKET_STATE_CONNECTED) {
			geneatree.emit("log", { type: Log.TYPE.INFO, message: "Disconnected from remote" })
			geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[persistence:socket] Disconnected" })
			geneatree.emit("osdSet", { text: "Connection to the server was terminated", type: "info" })
		}
		geneatree.socketState = SOCKET_STATE_DISCONNECTED
	})

	return socket
}

/**
 * Plug UI to remote persistence layer
 * Listen for UI events and alert remote
 */
export default properties => {

	const { geneatree } = properties

	let _socket = null

	geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[persistence:socket] Loaded" })

	let _offline = geneatree.settings.offline // User can disable remote persistence

	if(!_offline) {
		_socket = connect(properties)
	} else {
		geneatree.emit("log", { type: Log.TYPE.INFO, message: `Offline mode enabled` })
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: `[persistence:socket] Offline mode: Skipping socket` })
	}

	geneatree.listen("settingsSaved", () => {
		if(_offline && !geneatree.settings.offline) {
			geneatree.emit("log", { type: Log.TYPE.INFO, message: `Offline mode set to disabled` })
			geneatree.emit("log", { type: Log.TYPE.DEBUG, message: `[persistence:socket] Offline mode disabled: Connecting...` })
			_socket = connect(properties)
		} else if(!_offline && geneatree.settings.offline) {
			geneatree.emit("log", { type: Log.TYPE.INFO, message: `Offline mode set to enabled` })
			if(geneatree.socketState === SOCKET_STATE_CONNECTED || geneatree.socketState === SOCKET_STATE_CONNECTING) {
				geneatree.emit("log", { type: Log.TYPE.DEBUG, message: `[persistence:socket] Offline mode enabled: Closing socket...` })
				_socket.close(1000)
			}
		}
		_offline = geneatree.settings.offline
	})


}
