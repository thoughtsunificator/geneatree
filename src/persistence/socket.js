import Trees from "./socket/trees.js"
import Individuals from "./socket/individuals.js"
import Notes from "./socket/notes.js"

import Log from "../object/log.js"

export const SOCKET_STATE_INITIAL = "SOCKET_STATE_INITIAL"
const SOCKET_STATE_CONNECTING = "SOCKET_STATE_CONNECTING"
const SOCKET_STATE_CONNECTED = "SOCKET_STATE_CONNECTED"
const SOCKET_STATE_DISCONNECTED = "SOCKET_STATE_DISCONNECTED"

function connect(properties) {

	const { geneatree } = properties

	geneatree.emit("log", { type: Log.TYPE.INFO, message: `Connecting to server...` })
	geneatree.emit("log", { type: Log.TYPE.DEBUG, message: `[persistence:socket] Connecting...` })

	geneatree.socketState = SOCKET_STATE_CONNECTING
	const socket = new WebSocket(window.SOCKET_URL)

	const listeners = []

	const properties_ = { ...properties, socket, listeners }

	Trees(properties_)
	Individuals(properties_)
	Notes(properties_)

	socket.addEventListener('message', event => {
		const { query, data } = JSON.parse(event.data)

		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: `[persistence:socket] Received query: ${query}`, data })

		const listeners_ = listeners.filter(socketListener => socketListener.query === query)

		if(listeners_.length >= 1) {
			listeners_.forEach(socketListener => socketListener.callback(data))
		} else {
			geneatree.emit("log", { type: Log.TYPE.DEBUG, message: `[persistence:socket] Unrecognized query: ${query}` })
		}
	})

	socket.addEventListener("open", () => {
		geneatree.socketState = SOCKET_STATE_CONNECTED
		geneatree.emit("log", { type: Log.TYPE.INFO, message: `Connected to server` })
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[persistence:socket] Connected" })
		geneatree.emit("osdSet", { text: "Connected to server",  type: "info", duration: 2500 })
	})

	socket.addEventListener("error", event => {
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[persistence:socket] An error occured", data: event })
		if(geneatree.socketState === SOCKET_STATE_CONNECTED) {
			geneatree.emit("log", { type: Log.TYPE.ERROR, message: `Disconnected from server` })
			geneatree.emit("osdSet", { text: "Disconnected from server", type: "info", duration: 2500 })
		} else if(geneatree.socketState === SOCKET_STATE_CONNECTING) {
			geneatree.emit("log", { type: Log.TYPE.ERROR, message: `Failed to connect to server` })
			geneatree.emit("osdSet", { text: "Failed to connect to server",  type: "error", duration: 3500 })
		}
	})

	socket.addEventListener("close", () => {
		if(geneatree.socketState === SOCKET_STATE_CONNECTED) {
			geneatree.emit("log", { type: Log.TYPE.INFO, message: "Disconnected from server" })
			geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[persistence:socket] Disconnected" })
			geneatree.emit("osdSet", { text: "Connection to the server was terminated", type: "info", duration: 3500 })
		}
		geneatree.socketState = SOCKET_STATE_DISCONNECTED
	})

	return socket
}

export default properties => {

	const { geneatree } = properties

	let _socket = null

	geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[persistence:socket] Loaded" })

	let _offline = geneatree.settings.offline

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
